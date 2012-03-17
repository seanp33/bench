dojo.provide('bench.BrowserController');

dojo.require('bench.owf.Widget');

dojo.require('bench.util.Util');

dojo.declare('bench.BrowserController', null, {

    _owfContext:null,

    constuctor:function(owfContext) {
        this._owfContext = owfContext;
        this._initLogging();
    },

    onBrowserLoad:function(event) {
        this._logger.debug('bench.BrowserController#onBrowserLoad');
    },

    onBrowserUnload:function(event) {
        this._logger.debug('bench.BrowserController#onBrowserUnload');
    },

    onDOMFrameContentLoaded:function(event) {
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
        }
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.BrowserController');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});