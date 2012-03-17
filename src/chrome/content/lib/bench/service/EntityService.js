dojo.provide('bench.service.EntityService');

dojo.declare('bench.service.EntityService',null,{
    constructor:function(){
        this._initLogging();
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.service.EntityService');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});