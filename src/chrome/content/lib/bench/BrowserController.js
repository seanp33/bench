dojo.provide('bench.BrowserController');

dojo.require('bench.owf.Widget');

dojo.require('bench.util.Util');

dojo.declare('bench.BrowserController', null, {

    _owfContext:null,

    constructor:function(owfContext) {
        this._owfContext = owfContext;
        this._initLogging();
        this._initBrowserEventHandlers();
    },

    _onBrowserLoad:function(event) {
        this._logger.debug('onBrowserLoad');
    },

    _onBrowserUnload:function(event) {
        this._logger.debug('onBrowserUnload');
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
        if(document == undefined){
            throw new Error('Document is undefined. Unable to initialize browser event handlers');
        }

        let appcontent = document.getElementById("appcontent");
        let self = this;
        if (appcontent != undefined) {

            // TODO: establish a better way to observe these events...formal moz observer?
            appcontent.addEventListener("load", function(event){
                self._onBrowserLoad.call(self, event);
            }, true);

            appcontent.addEventListener("unload", function(event){
                self._onBrowserUnload.call(self, event);
            }, true);

            appcontent.addEventListener("DOMFrameContentLoaded", function(event){
                self._onDOMFrameContentLoaded.call(self, event);
            }, true);

        } else {
            this._logger.error("appcontent not here yall");
        }
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.BrowserController');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});