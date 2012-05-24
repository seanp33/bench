dojo.provide('bench.storage.ResultHandler');

dojo.require('bench.Loggable');

dojo.declare('bench.storage.ResultHandler', bench.Loggable, {

    constructor:function(resultHandler, completionHandler, errorHandler){
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
    }
});