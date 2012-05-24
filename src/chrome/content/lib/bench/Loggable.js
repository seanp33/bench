dojo.provide('bench.Loggable');

dojo.declare('bench.Loggable', null, {

    constructor:function() {
        this._initLogging();
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger(this.declaredClass);
        this._logger.level = Log4Moz.Level['Debug'];
    }
});
