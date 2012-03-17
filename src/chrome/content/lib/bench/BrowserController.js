dojo.provide('bench.BrowserController');

dojo.require('bench.owf.Widget');

dojo.require('bench.util.Util');

dojo.declare('bench.BrowserController', null, {

    _owfContext:null,

    constuctor:function(owfContext) {
        this._owfContext = owfContext;
        this._initLogging();
        this._initBrowserEventHandlers();
    },

    _onBrowserLoad:function(event) {
        this._logger.debug('bench.BrowserController#onBrowserLoad');
    },

    _onBrowserUnload:function(event) {
        this._logger.debug('bench.BrowserController#onBrowserUnload');
    },

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
        let appcontent = document.getElementById("appcontent");
        if (appcontent) {
            appcontent.addEventListener("load", this._onBrowserLoad, true);
            appcontent.addEventListener("unload", this._onBrowserUnload, true);
            appcontent.addEventListener("DOMFrameContentLoaded", this._onDOMFrameContentLoaded, true);
        } else {
            this._logger.error("appcontent not here yall");
        }
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.BrowserController');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});