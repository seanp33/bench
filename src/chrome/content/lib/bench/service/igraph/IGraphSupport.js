/**
 * Exposes IG types and functions
 */
dojo.provide('bench.service.igraph.IGraphSupport');

dojo.declare('bench.service.igraph.IGraphSupport', null, {

    T:{
        INTEGER_T:ctypes.int,
        REAL_T:ctypes.double,
        BOOL_T:ctypes.bool,
        VECTOR_T:null,
        GRAPH_STRUCT_T:null,
        SUCCESS : 0,
        FAILURE : 1,
        ENOMEM : 2,
        PARSEERROR : 3,
        EINVAL : 4,
        EXISTS : 5,
        EINVEVECTOR : 6,
        EINVVID : 7,
        NONSQUARE : 8,
        EINVMODE : 9,
        EFILE : 10,
        UNIMPLEMENTED : 12,
        INTERRUPTED : 13,
        DIVERGED : 14,
        ARPACK_PROD : 15,
        ARPACK_NPOS : 16,
        ARPACK_NEVNPOS : 17,
        ARPACK_NCVSMALL : 18,
        ARPACK_NONPOSI : 19,
        ARPACK_WHICHINV : 20,
        ARPACK_BMATINV : 21,
        ARPACK_WORKLSMALL : 22,
        ARPACK_TRIDERR : 23,
        ARPACK_ZEROSTART : 24,
        ARPACK_MODEINV : 25,
        ARPACK_MODEBMAT : 26,
        ARPACK_ISHIFT : 27,
        ARPACK_NEVBE : 28,
        ARPACK_NOFACT : 29,
        ARPACK_FAILED : 30,
        ARPACK_HOWMNY : 31,
        ARPACK_HOWMNYS : 32,
        ARPACK_EVDIFF : 33,
        ARPACK_SHUR : 34,
        ARPACK_LAPACK : 35,
        ARPACK_UNKNOWN : 36,
        ENEGLOOP : 37,
        EINTERNAL : 38},

    F:{},

    constructor:function(lib) {
        this._initTypes();
        this._initFunctions(lib);
    },

    _initTypes:function() {
        // https://developer.mozilla.org/en/js-ctypes/Using_js-ctypes/Declaring_types
        this.T.VECTOR_T = new ctypes.StructType("igVector",
            [
                { "stor_begin": ctypes.voidptr_t },
                { "stor_end": ctypes.voidptr_t },
                { "end": ctypes.voidptr_t }
            ]);

        this.T.GRAPH_STRUCT_T = new ctypes.StructType("igStruct",
            [
                { "n": this.T.INTEGER_T },
                { "directed": this.T.BOOL_T },
                { "from": this.T.VECTOR_T },
                { "to": this.T.VECTOR_T },
                { "oi": this.T.VECTOR_T },
                { "ii": this.T.VECTOR_T },
                { "os": this.T.VECTOR_T },
                { "is": this.T.VECTOR_T },
                { "attr": ctypes.voidptr_t }
            ]);
    },

    _initFunctions:function(lib) {
        // int empty(t *graph, integer_t n, bool_t directed);
        this.F.igraph_empty = lib.declare('igraph_empty', ctypes.default_abi, this.T.INTEGER_T, ctypes.voidptr_t,
            this.T.INTEGER_T, this.T.BOOL_T);

        // int growing_random_game(t *graph, integer_t n, integer_t m,
        // bool_t directed, bool_t citation);
        this.F.igraph_growing_random_game = lib.declare('igraph_growing_random_game', ctypes.default_abi, this.T.INTEGER_T,
            ctypes.voidptr_t, this.T.INTEGER_T, this.T.INTEGER_T, this.T.BOOL_T, this.T.BOOL_T);

        //int igraph_watts_strogatz_game(igraph_t *graph, igraph_integer_t dim, igraph_integer_t size, igraph_integer_t nei, igraph_real_t p);
        this.F.igraph_watts_strogatz_game = lib.declare('igraph_watts_strogatz_game', ctypes.default_abi, this.T.INTEGER_T,
            ctypes.voidptr_t, this.T.INTEGER_T, this.T.INTEGER_T, this.T.INTEGER_T, this.T.REAL_T);

        // igraph_integer_t igraph_vcount(const igraph_t *graph);
        this.F.igraph_vcount = lib.declare('igraph_vcount', ctypes.default_abi, this.T.INTEGER_T, ctypes.voidptr_t);

        // igraph_integer_t igraph_ecount(const igraph_t *graph);
        this.F.igraph_ecount = lib.declare('igraph_ecount', ctypes.default_abi, this.T.INTEGER_T, ctypes.voidptr_t);

        // igraph_bool_t igraph_is_directed(const igraph_t *graph);
        this.F.igraph_is_directed = lib.declare('igraph_is_directed', ctypes.default_abi, this.T.BOOL_T, ctypes.voidptr_t);

        // int igraph_create(igraph_t *graph, const igraph_vector_t *edges, igraph_integer_t n, igraph_bool_t directed);
        this.F.igraph_create = lib.declare('igraph_create', ctypes.default_abi, this.T.INTEGER_T, ctypes.voidptr_t,
            ctypes.voidptr_t, this.T.INTEGER_T, this.T.BOOL_T);
    }
});