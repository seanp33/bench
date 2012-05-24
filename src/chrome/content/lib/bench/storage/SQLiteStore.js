dojo.provide('bench.storage.SQLiteStore');

dojo.require('bench.storage.QueryAssembler');
dojo.require('bench.util.Util');
dojo.require('bench.Loggable');

dojo.declare('bench.storage.SQLiteStore', bench.Loggable, {

    dbName:null,
    file:null,
    conn:null,
    _assembler:null,
    _opened:false,
    _logger:null,

    constructor:function(dbName) {
        this.dbName = dbName;
        this._assembler = new bench.storage.QueryAssembler();
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
            this.sql(this._assembler.assembleInsert(table, obj));
        } catch(e) {
            this._logger.error(e);
        }
    },

    remove:function(table, obj) {
        this.sql(this._assembler.assembleDelete(table, obj));
    },

    update:function(table, idField, obj) {
        this.sql(this._assembler.assembleUpdate(table, idField, obj));
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
    }
});
