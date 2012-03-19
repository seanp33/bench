dojo.provide('bench.service.EntityService');

dojo.declare('bench.service.EntityService',null,{

    _entityStore:null,

    constructor:function(entityStore, indexService){
        this._entityStore = entityStore;
        this._indexService = indexService;
        this._initLogging();
        this._initializeStore();
    },

    loadEntities:function(){},

    _initializeStore:function(){
        this._entityStore.open();
        this._entityStore.sql("CREATE TABLE IF NOT EXISTS raw_data (id INTEGER PRIMARY KEY AUTOINCREMENT, src TEXT, src_port INTEGER, dst TEXT, dst_port INTEGER)");
        this._entityStore.close();
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.service.EntityService');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});