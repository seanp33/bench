dojo.provide('bench.storage.SQLiteStore');

dojo.require('bench.util.Util');

dojo.declare('bench.storage.SQLiteStore', null, {

    dbName:null,
    file:null,
    conn:null,
    _opened:false,
    _logger:null,

    constructor:function(dbName) {
        this._initLogging();
        this.dbName = dbName;
        this._logger.debug('bench.storage.SQLiteStore constructed for <' + this.dbName + '>');
    },

    open:function() {
        if (!this._opened) {
            try {
                this._logger.debug('opening store <' + this.dbName + '>');
                this.file = FileUtils.getFile("ProfD", [this.dbName]);
                this.conn = Services.storage.openDatabase(this.file);
                this._opened = true;
                this._logger.debug('store <' + this.dbName + '> opened and ready');
            } catch(e) {
                this._logger.error(e);
                this._opened = false;
            }
        }
    },

    close:function(async) {
        if (this.conn && this._opened) {
            async ? this.conn.asyncClose() : this.conn.close();
            this._opened = false;
        } else {
            throw new Error('No open database connection for <' + this.dbName + '> was found. has it been opened?');
        }
    },

    getLastInsertRowId:function() {
        return this.conn.executeSimpleSQL('last_insert_rowid()');
    },

    insert:function(table, obj, idCallback) {
        try {
            this.sql(this.assembleInsert(table, obj));
        } catch(e) {
            this._logger.error(e);
        }
    },

    remove:function(table, obj) {
        this.sql(this.assembleDelete(table, obj));
    },

    update:function(table, idField, obj) {
        this.sql(this.assembleUpdate(table, idField, obj));
    },

    describe:function(table, handler) {
        let q = 'PRAGMA table_info(' + table + ')';
        this.sql(q, handler);
    },

    sql:function(sql, handler) {
        this._logger.debug(sql);
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
    },

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
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.store.SQLiteStore');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});
