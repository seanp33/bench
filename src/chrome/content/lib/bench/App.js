dojo.provide('bench.App');

dojo.require('bench.service.EntityService');
dojo.require('bench.storage.SQLiteStore');

dojo.declare('bench.App', null, {
    _entityService:null,
    _entityStore:null,

    constructor:function() {
        this._logger = Log4Moz.repository.getLogger('bench.App');
        this._logger.level = Log4Moz.Level['Debug'];
        this._logger.debug('bench.App constructed');

        this._entityService = new bench.service.EntityService();
        this._entityStore = new bench.storage.SQLiteStore('entityStore.sqlite');
    },

    run:function() {
        this._initEntityStore();
    },

    _initEntityStore:function(){
        this._entityStore.open();
        this._entityStore.sql("CREATE TABLE IF NOT EXISTS raw_data (id INTEGER PRIMARY KEY AUTOINCREMENT)");
        this._entityStore.close();

        this._logger.debug('successfully initialized <' + this._entityStore.dbName + '>');
    }
});