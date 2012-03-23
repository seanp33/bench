dojo.provide('bench.App');

dojo.require('bench.service.EntityService');
dojo.require('bench.service.ViewService');
dojo.require('bench.service.igraph.IGraphService');
dojo.require('bench.storage.SQLiteStore');
dojo.require('bench.BrowserController');
dojo.require('bench.owf.OWFContext');
dojo.require('bench.util.Util');

dojo.declare('bench.App', null, {
    _context:{},
    _entityService:null,
    _viewService:null,
    _igraphService:null,
    _store:null,
    _owfContext:null,
    _browserController:null,

    constructor:function() {
        this._initLogging();
        this._initServices();
        this._initBrowserEnvironment();
    },

    run:function() {
        this._logger.debug('bench.App#run');
    },

    _initServices:function() {
        this._store = this._register(new bench.storage.SQLiteStore('entityStore.sqlite'));
        this._viewService = this._register(new bench.service.ViewService(this._store));
        this._entityService = this._register(new bench.service.EntityService(this._store));
        this._igraphService = this._register(new bench.service.igraph.IGraphService());
        this._logger.debug('successfully initialized <' + this._store.dbName + '>');
    },

    _initBrowserEnvironment:function() {
        this._logger.debug('initializing browser env');
        this._owfContext = this._register(new bench.owf.OWFContext());
        this._browserController = this._register(new bench.BrowserController(this._owfContext));
    },

    _register:function(obj) {
        this._context[obj.declaredClass] = obj;
        return obj;
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.App');
        this._logger.level = Log4Moz.Level['Debug'];
        this._logger.debug('bench.App constructed');
    }
});