dojo.provide('bench.service.EntityService');

dojo.require('bench.Loggable');

dojo.declare('bench.service.EntityService', bench.Loggable, {

    _store:null,

    constructor:function(store) {
        this._store = store;
        this._initLogging();
        this._initializeStore();
    },

    _initializeStore:function() {
        this._store.open();
        this._store.sql(bench.service.EntityService.CREATE_TABLE);
        this._store.close();
    }

});

bench.service.EntityService.CREATE_TABLE = "CREATE TABLE IF NOT EXISTS entities (id INTEGER PRIMARY KEY AUTOINCREMENT, src TEXT, src_port INTEGER, dst TEXT, dst_port INTEGER)";