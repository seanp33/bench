dojo.provide('bench.App');

dojo.require('bench.service.EntityService');
dojo.require('bench.storage.SQLiteStore');

dojo.declare('bench.App', null, {
    _entityService:null,
    _sqliteStore:null,

    constructor:function() {
        Application.console.log('dojo has loaded bench.App');
        Application.console.log("Services.appinfo.ID: " + Services.appinfo.ID);
        this._entityService = new bench.service.EntityService();
        this._sqliteStore = new bench.storage.SQLiteStore();

        this._logger = Log4Moz.repository.getLogger('bench.App');
        this._logger.level = Log4Moz.Level["Debug"];
        this._logger.error("Oh noes!! Something bad happened!");
        this._logger.debug("Details about bad thing only useful during debugging");
    },

    run:function() {
        this._entityService.service();
        this._sqliteStore.store();
    }
});