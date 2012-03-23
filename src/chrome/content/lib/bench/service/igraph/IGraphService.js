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
            let graph = new this.T.GRAPH_STRUCT_T();
            this._logger.debug('..... before calling igraph_empty .....');
            //bench.util.Util.dump(graph);

            //let retCode = this.igraph_empty(graph.address(), 1, true);

            // TODO: FIGURE OUT WHY THIS IS CRASHING THE DAMN THREAD!
            let retCode = this.F.igraph_watts_strogatz_game(graph.address(), 10, 10, 10, 1);
            this._logger.debug('retCode: ' + retCode);

            this._logger.debug('..... after calling igraph_watts_strogatz_game .....');

            //bench.util.Util.dump(graph);

            let vcount = this.F.igraph_vcount(graph.address());
            this._logger.debug('igraph_vcount : ' + vcount);

            let isDirected = this.F.igraph_is_directed(graph.address());
            this._logger.debug('igraph_is_directed : ' + isDirected);

        } catch(e) {
            this._logger.error('error testing igraph_watts_strogatz_game: ' + e);
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