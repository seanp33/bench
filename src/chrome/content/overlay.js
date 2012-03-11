var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/FileUtils.jsm");
Cu.import("resource://bench.modules/log4moz.jsm");

const LOG = Application.console.log;
const $ = function(id) {
    return document.getElementById(id);
}

dojo.require('bench.App');

// initialize logging
let formatter = new Log4Moz.BasicFormatter();
let root = Log4Moz.repository.rootLogger;
root.level = Log4Moz.Level["All"];
let capp = new Log4Moz.ConsoleAppender(formatter);
capp.level = Log4Moz.Level["All"];
root.addAppender(capp);


var Bench = {

    init:function() {

        var app = new bench.App();
        app.run();
        Application.console.log("Services.appinfo.ID (ob): " + Services.appinfo.ID);
        var appcontent = document.getElementById("appcontent");
        if (appcontent) {
            appcontent.addEventListener("load", Bench.Browser.onBrowserLoad, true);
            appcontent.addEventListener("unload", Bench.Browser.onBrowserUnload, true);
            appcontent.addEventListener("DOMFrameContentLoaded", Bench.Browser.onDOMFrameContentLoaded, true);
        } else {
            LOG("appcontent not here yall");
        }
    },

    dump:function(o, oName) {
        for (var p in o) {
            LOG(oName + ': ' + p);
        }
    },

    jeval:function(str) {
        return eval('(' + str + ')')
    }
};

Bench.Browser = {

    onBrowserLoad:function(event) {
        LOG("onBrowserLoad");
    },

    onBrowserUnload:function(event) {
        LOG("onBrowserUnload");
    },

    onDOMFrameContentLoaded:function(event) {
        LOG("_DOMFrameContentLoaded");
        let doc = event.originalTarget;

        if (doc.id != undefined) {
            try {
                let data = Bench.jeval(doc.id);
                if (data && data.owf) {
                    let widget = new Bench.Ozone.Widget(doc, data);
                    Bench.Ozone.addWidget(widget);
                    if (!Bench.Ozone.initialized) {
                        Bench.Ozone.init(doc.contentWindow.wrappedJSObject.Ozone, doc.contentWindow.wrappedJSObject.gadgets);
                        Bench.Ozone.subscribe("bench.ddl", function(sender, msg) {
                            LOG('handling bench.ddl');
                            Bench.DB.open();
                            Bench.DB.applyDDL(msg)
                        });
                    }
                }
            } catch(e) {
                LOG(e);
            }
        }
    }
}

Bench.Ozone = {
    initialized:false,
    _ozone:null,
    _widgets:[],
    _gadgets:null,
    _pubsub:null,

    init:function(ozone, gadgets) {
        this._ozone = ozone;
        this._gadgets = gadgets;
        this._pubsub = gadgets.pubsub;
        this.initialized = true;
    },

    addWidget:function(widget) {
        this._widgets.push(widget);
    },

    subscribe:function(channel, callback) {
        this._pubsub.subscribe(channel, callback);
    },

    unsubscribe:function(channel) {
        this._pubsub.subscribe(channel);
    },

    publish:function(channel, message) {
        this._pubsub.publish(channel, message);
    }
};

Bench.Ozone.Widget = function(document, data) {
    this.document = document;
    this.id = data.id;
    this.containerVersion = data.containerVersion;
    this.webContextPath = data.webContextPath;
    this.preferenceLocation = data.preferenceLocation;
    this.relayUrl = data.relayUrl;
    this.lang = data.lang;
    this.owf = data.owf;
};

/**
 * @class Maintains a sqlite store for the given name
 *
 * @param {string} The name used to obain a database file, where the physical
 * name of the file will be <name>.sqlite. Database files will be created in the
 * user's mozilla profile directory - "ProfD."
 *
 */
Bench.Store = function(name) {
    this.name = name;
    this.file = null;
    this.conn = null;
    this._opened = false;
}

Bench.Store.prototype = {

    open:function() {
        if (!this._opened) {
            try {
                LOG('opening store <' + this.name + '>');
                this.file = FileUtils.getFile("ProfD", [this.name]);
                this.conn = Services.storage.openDatabase(this.file);
                this._opened = true;
                LOG('store <' + this.name + '> opened and ready');
            } catch(e) {
                LOG('ERROR: ' + e);
                this._opened = false;
            }
        }
    },

    close:function(async) {
        if (this.conn && this._opened) {
            async ? this.conn.asyncClose() : this.conn.close();
            this._opened = false;
        } else {
            throw new Error('No open database connection for <' + this.name + '> was found. @see Bench.Store.open(...)');
        }
    },

    getLastInsertRowId:function() {
        return this.conn.executeSimpleSQL('last_insert_rowid()');
    },

    insert:function(table, obj, idCallback) {
        // TODO: Figure out how to obtain the auto generated id - if possible, and return it
        // see http://www.sqlite.org/lang_corefunc.html, last_insert_rowid()
        try {
            this.sql(Bench.Store.Util.assembleInsert(table, obj));
        } catch(e) {
            LOG('ERROR: ' + e);
        }
    },

    remove:function(table, obj) {
        this.sql(Bench.Store.Util.assembleDelete(table, obj));
    },

    update:function(table, idField, obj) {
        this.sql(Bench.Store.Util.assembleUpdate(table, idField, obj));
    },

    sql:function(sql, handler) {
        if (handler == undefined || handler == null) {
            this.conn.executeSimpleSQL(sql);
        } else {
            let stmts = this.prepareStatements(sql);
            this.conn.executeAsync(stmts, stmts.length, handler);
        }

    },

    prepareStatements:function(sql) {
        let stmts = [];
        if (!Array.isArray(sql)) {
            sql = [sql];
        }
        for (let i = 0; i < sql.length; i++) {
            stmts.push(this.conn.createStatement(sql[i]));
        }

        return stmts;
    }
}

Bench.Store.Util = {

    assembleSelect:function(table, obj) {
        let q = "SELECT * FROM " + table + ' WHERE ';
        for (let p in obj) {
            q += p + '=' + this.prepValue(obj[p]) + ' AND ';
        }
        q = q.substring(0, q.length - 5) + ';';

        return q;
    },

    assembleInsert:function(table, obj) {
        let q = "INSERT into " + table;
        let columns = ' (';
        let values = ' VALUES(';
        for (let p in obj) {
            columns += p + ',';
            values += this.prepValue(obj[p]) + ',';
        }

        columns = columns.substring(0, columns.length - 1) + ')';
        values = values.substring(0, values.length - 1) + ')';

        q += columns + values + ';';
        return q;
    },

    assembleDelete:function(table, obj) {
        let q = "DELETE FROM " + table + ' WHERE ';
        for (let p in obj) {
            q += p + '=' + this.prepValue(obj[p]) + ' AND ';
        }
        q = q.substring(0, q.length - 5) + ';';

        return q;
    },

    assembleUpdate:function(table, idField, obj) {
        let q = "UPDATE " + table + ' SET ';
        for (let p in obj) {
            if (p != idField) {
                q += p + '=' + this.prepValue(obj[p]) + ', ';
            }
        }
        q = q.substring(0, q.length - 2) + ' WHERE ' + idField + '=' + this.prepValue(obj[idField]) + ';';

        return q;
    },

    prepValue:function(val) {
        if (typeof val === 'string') {
            val = "'" + val + "'";
        }

        return val;
    }
}

Bench.Sim = function() {
    this.store = null;
    this.handler = null;
}

Bench.Sim.prototype = {
    fill:function(store, count, handler) {
        this.store = store;
        this.handler = handler;

        LOG("filling " + count);
        var worker = new ChromeWorker("chrome://bench/content/data-generator.js");
        LOG("### worker created");

        let self = this;
        worker.onmessage = function(event) {
            self.executeStatements(event.data);
        };

        worker.onerror = function(event) {
            LOG("### worker error: " + event);
        };

        worker.postMessage(count);
    },

    executeStatements:function(sqlStatements) {
        var count = sqlStatements.length;

        LOG(">>> " + count + " generated");

        var stmts = [];

        if (!this.store._opened) {
            this.store.open();
        }

        for (var i = 0; i < count; i++) {
            stmts.push(this.store.conn.createStatement(sqlStatements[i]));
        }

        this.store.conn.executeAsync(stmts, count, this.handler);

        sqlStatements = null;

        this.store.close(true);
    }
}

window.addEventListener("load", Bench.init, false);