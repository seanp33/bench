dojo.provide('bench.App');

dojo.require('bench.service.EntityService');
dojo.require('bench.storage.SQLiteStore');

dojo.declare('bench.App',null,{
    _entityService:null,
    _sqliteStore:null,

    constructor:function(){
        Application.console.log('dojo has loaded bench.App');
        this._entityService = new bench.service.EntityService();
        this._sqliteStore = new bench.storage.SQLiteStore();
    },

    run:function(){
        this._entityService.service();
        this._sqliteStore.store();
    }
});