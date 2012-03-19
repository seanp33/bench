dojo.provide('bench.storage.ResultHandler');

dojo.declare('bench.storage.ResultHandler', null, {

    constructor:function(resultHandler, completionHandler, errorHandler){
        this._initLogging();
        this.handleResult = resultHandler;
        this.handleCompletion = completionHandler || this._handleCompletion;
        this.handleError = errorHandler || this._handleError;
    },

    _handleCompletion:function(reason) {
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

        this._logger.debug(msg);
    },

    _handleError:function(error) {
        this._logger.error(error);
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.storage.ResultHandler');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});