dojo.provide('bench.service.IGraphService');

dojo.require('bench.util.Util');

dojo.declare('bench.service.IGraphService', null, {

    lib:null,


    IG_INTEGER_T:ctypes.double,
    IG_REAL_T:ctypes.double,
    IG_BOOL_T:ctypes.int,

    // igraph_vector_t
    IG_VECTOR_T:ctypes.int,


    IG_GRAPH_STRUCT_T:null,
    /*
     IGRAPH_SUCCESS : 0,
     IGRAPH_FAILURE : 1,
     IGRAPH_ENOMEM : 2,
     IGRAPH_PARSEERROR : 3,
     IGRAPH_EINVAL : 4,
     IGRAPH_EXISTS : 5,
     IGRAPH_EINVEVECTOR : 6,
     IGRAPH_EINVVID : 7,
     IGRAPH_NONSQUARE : 8,
     IGRAPH_EINVMODE : 9,
     IGRAPH_EFILE : 10,
     IGRAPH_UNIMPLEMENTED : 12,
     IGRAPH_INTERRUPTED : 13,
     IGRAPH_DIVERGED : 14,
     IGRAPH_ARPACK_PROD : 15,
     IGRAPH_ARPACK_NPOS : 16,
     IGRAPH_ARPACK_NEVNPOS : 17,
     IGRAPH_ARPACK_NCVSMALL : 18,
     IGRAPH_ARPACK_NONPOSI : 19,
     IGRAPH_ARPACK_WHICHINV : 20,
     IGRAPH_ARPACK_BMATINV : 21,
     IGRAPH_ARPACK_WORKLSMALL : 22,
     IGRAPH_ARPACK_TRIDERR : 23,
     IGRAPH_ARPACK_ZEROSTART : 24,
     IGRAPH_ARPACK_MODEINV : 25,
     IGRAPH_ARPACK_MODEBMAT : 26,
     IGRAPH_ARPACK_ISHIFT : 27,
     IGRAPH_ARPACK_NEVBE : 28,
     IGRAPH_ARPACK_NOFACT : 29,
     IGRAPH_ARPACK_FAILED : 30,
     IGRAPH_ARPACK_HOWMNY : 31,
     IGRAPH_ARPACK_HOWMNYS : 32,
     IGRAPH_ARPACK_EVDIFF : 33,
     IGRAPH_ARPACK_SHUR : 34,
     IGRAPH_ARPACK_LAPACK : 35,
     IGRAPH_ARPACK_UNKNOWN : 36,
     IGRAPH_ENEGLOOP : 37,
     IGRAPH_EINTERNAL : 38,
     */

    constructor:function() {
        this._initLogging();
        this._initLib();
        this._initTypes();
        this._initFunctions();

        // test this

        try {
            let graph = new this.IG_GRAPH_STRUCT_T();
            this._logger.debug('..... before calling igraph_empty .....');
            bench.util.Util.dump(graph);

            let retCode = this.igraph_empty(graph.ptr, 1, true);
            this._logger.debug('retCode: ' + retCode);

            this._logger.debug('..... after calling igraph_empty .....');
            bench.util.Util.dump(graph);
        } catch(e) {
            this._logger.error('error testing igraph_empty' + e);
        }
    },

    _initLib:function() {

        if (this.lib == null) {

            // TODO: move this to some kind of external config
            let sos = {};
            sos['Darwin'] = 'libigraph.0.dylib';

            let home = bench.util.Util.getPath("Home");
            let extBase = bench.util.Util.getExtPath().path;

            let os = bench.util.Util.getOs();
            this._logger.debug('os: ' + os);

            let path = extBase + '/ctypes/igraph/' + os + '/' + sos[os];
            this._logger.debug("Attempting to load ctype from: " + path);

            try {
                this.lib = ctypes.open(path);
            } catch(e) {
                this._logger.error('igraph ctype initialization error' + e);
            }
        }
    },

    _initTypes:function() {
        // https://developer.mozilla.org/en/js-ctypes/Using_js-ctypes/Declaring_types
        this.IG_GRAPH_STRUCT_T = new ctypes.StructType("igStruct",
            [
                { "n": this.IG_INTEGER_T },
                { "directed": this.IG_BOOL_T },
                { "from": this.IG_VECTOR_T },
                { "to": this.IG_VECTOR_T },
                { "oi": this.IG_VECTOR_T },
                { "ii": this.IG_VECTOR_T },
                { "os": this.IG_VECTOR_T },
                { "is": this.IG_VECTOR_T },
                { "attr": ctypes.voidptr_t }
            ]);
    },

    _initFunctions:function() {
        //int igraph_empty(igraph_t *graph, igraph_integer_t n, igraph_bool_t directed);
        //this.igraph_empty = this.lib.declare('igraph_empty', ctypes.default_abi, this.IG_STRUCT_T.ptr, this.IG_INTEGER_T, this.IG_BOOL_T);
        this.igraph_empty = this.lib.declare('igraph_empty', ctypes.default_abi, this.IG_INTEGER_T, this.IG_GRAPH_STRUCT_T.ptr, this.IG_INTEGER_T, this.IG_BOOL_T);
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.service.IGraphService');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});