dojo.provide('bench.BrowserController');

dojo.require('bench.owf.Widget');
dojo.require('bench.util.Util');
dojo.require('bench.Loggable');

dojo.declare('bench.BrowserController', bench.Loggable, {

    _owfContext:null,

    constructor:function(owfContext) {
        this._owfContext = owfContext;
        this._initBrowserEventHandlers();
    },

    _onBrowserLoad:function(event) {},

    _onBrowserUnload:function(event) {},

    _onDOMFrameContentLoaded:function(event) {
        this._logger.debug('bench.BrowserController#onDOMFrameContentLoaded');

        let doc = event.originalTarget;

        if (doc.id != undefined) {
            try {
                let data = bench.util.Util.jeval(doc.id);
                if (data && data.owf) {
                    let widget = new bench.owf.Widget(doc, data);
                    this._owfContext.registerWidget(widget);
                    if (!this._owfContext.isInitialized()) {
                        this._owfContext.initialize(doc.contentWindow.wrappedJSObject.Ozone, doc.contentWindow.wrappedJSObject.gadgets);
                    }
                }
            } catch(error) {
                this._logger.error(error);
            }
        } else {
            this._logger.debug('OWF not present. idle');
        }
    },

    _initBrowserEventHandlers:function() {
        if (document == undefined) {
            throw new Error('document is undefined. Unable to initialize browser event handlers');
        }

        let self = this;

        let appcontent = dojo.byId('appcontent');
        if (appcontent != undefined) {

            // TODO: establish a better way to observe these events...formal moz observer?
            appcontent.addEventListener('load', function(event) {
                self._onBrowserLoad.call(self, event);
            }, true);

            appcontent.addEventListener('unload', function(event) {
                self._onBrowserUnload.call(self, event);
            }, true);

            appcontent.addEventListener('DOMFrameContentLoaded', function(event) {
                self._onDOMFrameContentLoaded.call(self, event);
            }, true);

        } else {
            this._logger.error('Element with id \'appcontent\' undefined. Unable to initialize browser event handlers');
        }
    }
});