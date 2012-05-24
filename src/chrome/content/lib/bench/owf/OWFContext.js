dojo.provide('bench.owf.OWFContext');

dojo.require('bench.Loggable');

dojo.declare('bench.owf.OWFContext', bench.Loggable, {

    _ozone:null,
    _widgets:[],
    _gadgets:null,
    _pubsub:null,

    constructor:function() {},

    initialize:function(ozone, gadgets){
        this._ozone = ozone;
        this._gadgets = gadgets;
        this._pubsub = gadgets.pubsub;
        this._logger.debug('initialized');
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
        this._pubsub.unsubscribe(channel);
    },

    publish:function(channel, message) {
        this._pubsub.publish(channel, message);
    }

});