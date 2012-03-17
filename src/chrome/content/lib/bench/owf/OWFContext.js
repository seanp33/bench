dojo.provide('bench.owf.OWFContext');

dojo.declare('bench.owf.OWFContext', null, {

    _ozone:null,
    _widgets:[],
    _gadgets:null,
    _pubsub:null,

    constructor:function() {
        this._initLogging();
    },

    initialize:function(ozone, gadgets){
        this._ozone = ozone;
        this._gadgets = gadgets;
        this._pubsub = gadgets.pubsub;
        this._logger.debug('bench.owf.OWFContext initialized');
    },

    isInitialized:function() {
        return (this._ozone != null && this._gadgets != null);
    },

    registerWidget:function(widget) {
        this._widgets.push(widget);
    },

    subscribe:function(channel, callback) {
        this._pubsub.subscribe(channel, callback);
    },

    unsubscribe:function(channel) {
        this._pubsub.subscribe(channel);
    },

    publish:function(channel, message) {
        this._pubsub.publish(channel, message);
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.owf.OWFContext');
        this._logger.level = Log4Moz.Level['Debug'];
    }

});