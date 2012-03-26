dojo.provide('bench.service.igraph.IGraphService');

dojo.require('bench.util.Util');
dojo.require('bench.service.igraph.IGraphSupport');

dojo.declare('bench.service.igraph.IGraphService', null, {

    lib:null,
    T:null,
    F:null,

    constructor:function() {
        this._initLogging();
        this._initLib();
        this._initSupport();

        // test this
        try {
            this._logger.debug('..... igraph_full');
            let graph = new this.T.GRAPH_STRUCT_T();

            let result = this.F.igraph_full(graph.address(), 5000000, true, true);
            this._logger.debug('result: ' + result);

            let vcount = this.F.igraph_vcount(graph.address());
            this._logger.debug('igraph_vcount : ' + vcount);

            let ecount = this.F.igraph_ecount(graph.address());
            this._logger.debug('igraph_ecount : ' + ecount);

            let isDirected = this.F.igraph_is_directed(graph.address());
            this._logger.debug('igraph_is_directed : ' + isDirected);

            result = this.F.igraph_destroy(graph.address());
            this._logger.debug('..... graph destroyed : ' + result);

        } catch(e) {
            this._logger.error('error testing graph stuffs: ' + e);
        }
    },

    _initLib:function() {
        if (this.lib == null) {
            // TODO: move this to some kind of external config
            let sos = {};
            sos['Darwin'] = 'libigraph.0.dylib';

            let extBase = bench.util.Util.getExtPath().path;

            let os = bench.util.Util.getOs();

            let path = extBase + '/ctypes/igraph/' + os + '/' + sos[os];
            this._logger.debug("Attempting to load ctype from: " + path);

            try {
                this.lib = ctypes.open(path);
            } catch(e) {
                let msg = 'igraph ctype initialization error' + e;
                this._logger.error(msg);
                throw new Error(msg);
            }
        }
    },

    _initSupport:function() {
        let igSupport = new bench.service.igraph.IGraphSupport(this.lib);
        this.T = igSupport.T;
        this.F = igSupport.F;
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.service.igraph.IGraphService');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});