var EXPORTED_SYMBOLS = ["IGraph"];

const Cu = Components.utils;
const Cc = Components.classes;
const Ci = Components.interfaces;

Cu.import("resource://gre/modules/ctypes.jsm");

const Application = Cc["@mozilla.org/fuel/application;1"].getService(Ci.fuelIApplication);

//////////////////////////////////////////////////////////////////////////////////////////
// Monster.Graph
//////////////////////////////////////////////////////////////////////////////////////////
IGraph = (function() {

    var Monster = null;
    var lib = null;

    return{
        initialize:_initialize,
        open:_open,
        close:_close,
        igraph_erdos_renyi_game:_igraph_erdos_renyi_game
    }

    function _initialize() {
        // declare types : https://developer.mozilla.org/en/js-ctypes/Using_js-ctypes/Declaring_types
        // declare functions : https://developer.mozilla.org/en/js-ctypes/Using_js-ctypes/Declaring_and_calling_functions
    }

    function _open() {
        if (lib == null) {
            let home = Monster.Paths.getPath("Home");
            let path = home + '/Development/projects/monster/monster-fox/staging/ctypes/igraph/libigraph.so';
            Monster.Logger.debug("Attempting to load ctype from: " + path);
            lib = ctypes.open(path);
        }

        return lib;
    }

    function _close() {
        if (lib != null) {
            lib.close();
            lib = null;
        }
    }

    function _igraph_erdos_renyi_game(){
        lib.igraph_erdos_renyi_game(/*insert args*/);
    }

    // types.h
    const igraph_integer_t = ctypes.double;
    const igraph_real_t = ctypes.double;
    const igraph_bool_t = ctypes.int;

    // igraph_vector_t
    const igraph_vector_t = null;

    const struct_igraph = new ctypes.StructType("tm",
        [
            { "n": igraph_integer_t },
            { "directed": igraph_bool_t },
            { "from": igraph_vector_t },
            { "to": igraph_vector_t },
            { "oi": igraph_vector_t },
            { "ii": igraph_vector_t },
            { "os": igraph_vector_t },
            { "is": igraph_vector_t },
            { "attr": ctypes.voidptr_t }
        ]);

    const IGRAPH_SUCCESS = 0;
    const IGRAPH_FAILURE = 1;
    const IGRAPH_ENOMEM = 2;
    const IGRAPH_PARSEERROR = 3;
    const IGRAPH_EINVAL = 4;
    const IGRAPH_EXISTS = 5;
    const IGRAPH_EINVEVECTOR = 6;
    const IGRAPH_EINVVID = 7;
    const IGRAPH_NONSQUARE = 8;
    const IGRAPH_EINVMODE = 9;
    const IGRAPH_EFILE = 10;
    const IGRAPH_UNIMPLEMENTED = 12;
    const IGRAPH_INTERRUPTED = 13;
    const IGRAPH_DIVERGED = 14;
    const IGRAPH_ARPACK_PROD = 15;
    const IGRAPH_ARPACK_NPOS = 16;
    const IGRAPH_ARPACK_NEVNPOS = 17;
    const IGRAPH_ARPACK_NCVSMALL = 18;
    const IGRAPH_ARPACK_NONPOSI = 19;
    const IGRAPH_ARPACK_WHICHINV = 20;
    const IGRAPH_ARPACK_BMATINV = 21;
    const IGRAPH_ARPACK_WORKLSMALL = 22;
    const IGRAPH_ARPACK_TRIDERR = 23;
    const IGRAPH_ARPACK_ZEROSTART = 24;
    const IGRAPH_ARPACK_MODEINV = 25;
    const IGRAPH_ARPACK_MODEBMAT = 26;
    const IGRAPH_ARPACK_ISHIFT = 27;
    const IGRAPH_ARPACK_NEVBE = 28;
    const IGRAPH_ARPACK_NOFACT = 29;
    const IGRAPH_ARPACK_FAILED = 30;
    const IGRAPH_ARPACK_HOWMNY = 31;
    const IGRAPH_ARPACK_HOWMNYS = 32;
    const IGRAPH_ARPACK_EVDIFF = 33;
    const IGRAPH_ARPACK_SHUR = 34;
    const IGRAPH_ARPACK_LAPACK = 35;
    const IGRAPH_ARPACK_UNKNOWN = 36;
    const IGRAPH_ENEGLOOP = 37;
    const IGRAPH_EINTERNAL = 38;


})();