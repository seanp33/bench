dojo.provide('bench.App');

dojo.require('bench.service.EntityService');
dojo.require('bench.service.ViewService');
dojo.require('bench.service.igraph.IGraphService');
dojo.require('bench.storage.SQLiteStore');
dojo.require('bench.BrowserController');
dojo.require('bench.owf.OWFContext');
dojo.require('bench.util.Util');
dojo.require('bench.ui.OverlayMediator');
dojo.require('bench.Loggable');

dojo.declare('bench.App', bench.Loggable, {
    _context:{},
    _entityService:null,
    _viewService:null,
    _igraphService:null,
    _store:null,
    _owfContext:null,
    _browserController:null,

    constructor:function() {
        this._initServices();
        this._initBrowserEnvironment();

        new bench.ui.OverlayMediator();
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
    }
});