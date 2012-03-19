dojo.provide('bench.App');

dojo.require('bench.service.EntityService');
dojo.require('bench.storage.SQLiteStore');
dojo.require('bench.BrowserController');
dojo.require('bench.owf.OWFContext');

dojo.declare('bench.App', null, {
    _entityService:null,
    _indexService:null,
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

    _initServices:function() {
        this._entityStore = new bench.storage.SQLiteStore('entityStore.sqlite');
        this._indexService = new bench.service.IndexService();
        this._entityService = new bench.service.EntityService(this._entityStore, this._indexService);
        this._logger.debug('successfully initialized <' + this._entityStore.dbName + '>');
    },

    _initBrowserEnvironment:function() {
        this._logger.debug('initializing browser env');
        this._owfContext = new bench.owf.OWFContext();
        this._browserController = new bench.BrowserController(this._owfContext);
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.App');
        this._logger.level = Log4Moz.Level['Debug'];
        this._logger.debug('bench.App constructed');
    }
});