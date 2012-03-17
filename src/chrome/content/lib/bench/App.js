dojo.provide('bench.App');

dojo.require('bench.service.EntityService');
dojo.require('bench.storage.SQLiteStore');
dojo.require('bench.BrowserController');
dojo.require('bench.owf.OWFContext');

dojo.declare('bench.App', null, {
    _entityService:null,
    _entityStore:null,
    _owfContext:null,
    _browserController:null,

    constructor:function() {
        this._initLogging();
        this._initEntitySuite();
        this._initBrowserEnvironment();
    },

    run:function() {
        this._logger.debug('bench.App#run');
    },

    _initEntitySuite:function() {
        this._entityService = new bench.service.EntityService();
        this._entityStore = new bench.storage.SQLiteStore('entityStore.sqlite');
        this._entityStore.open();
        this._entityStore.sql("CREATE TABLE IF NOT EXISTS raw_data (id INTEGER PRIMARY KEY AUTOINCREMENT, src TEXT, src_port INTEGER, dst TEXT, dst_port INTEGER)");
        this._entityStore.close();

        this._logger.debug('successfully initialized <' + this._entityStore.dbName + '>');
    },

    _initBrowserEnvironment:function() {
        this._owfContext = new bench.owf.OWFContext();
        this._browserController = new bench.BrowserController(this._owfContext);
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.App');
        this._logger.level = Log4Moz.Level['Debug'];
        this._logger.debug('bench.App constructed');
    }
});