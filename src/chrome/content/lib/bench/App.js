dojo.provide('bench.App');

dojo.require('bench.service.EntityService');
dojo.require('bench.service.ViewService');
dojo.require('bench.storage.SQLiteStore');
dojo.require('bench.BrowserController');
dojo.require('bench.owf.OWFContext');
dojo.require('bench.util.Util');

dojo.declare('bench.App', null, {
    _context:{},
    _entityService:null,
    _viewService:null,
    _store:null,
    _owfContext:null,
    _browserController:null,

    constructor:function() {
        this._initLogging();
        this._initGlobalListener();
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
        this._logger.debug('successfully initialized <' + this._store.dbName + '>');
    },

    _initBrowserEnvironment:function() {
        this._logger.debug('initializing browser env');
        this._owfContext = this._register(new bench.owf.OWFContext());
        this._browserController = this._register(new bench.BrowserController(this._owfContext));
    },

    _initGlobalListener:function(){
       let self = this;
        dojo.subscribe('bench.inject', function(data){
            self._logger.debug('dumping...');
            let target = data.target;
            let declaredClass = data.declaredClass;
            self._logger.debug('target.declaredClass: ' + target.declaredClass + ' requested injection of ' + data.injectType);
        });
    },

    _register:function(obj){
        this._context[obj.declaredClass] = obj;
        return obj;
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.App');
        this._logger.level = Log4Moz.Level['Debug'];
        this._logger.debug('bench.App constructed');
    }
});