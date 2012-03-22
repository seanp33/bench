dojo.provide('bench.service.EntityService');

dojo.declare('bench.service.EntityService', null, {

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
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.service.EntityService');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});

bench.service.EntityService.CREATE_TABLE = "CREATE TABLE IF NOT EXISTS entities (id INTEGER PRIMARY KEY AUTOINCREMENT, src TEXT, src_port INTEGER, dst TEXT, dst_port INTEGER)";