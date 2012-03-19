dojo.provide('bench.storage.AsyncHandler');

dojo.declare('bench.storage.AsyncHandler', null, {

    constructor:function(resultHandler){
        this._initLogging();
        this.handleResult = resultHandler;
    },

    handleCompletion:function(reason) {
        let msg;
        switch (reason) {
            case 0 :
                msg = 'REASON_FINISHED';
                break;
            case 1 :
                msg = 'REASON_CANCELED';
                break;
            case 2   :
                msg = 'REASON_ERROR';
                break;
        }
    },

    handleError:function(error) {
        this._logger.error(error);
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.storage.AsyncHandler');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});