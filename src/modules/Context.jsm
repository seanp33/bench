var EXPORTED_SYMBOLS = ["Context"];

var Context = (function() {

    var registry = {};

    return {
        get:getImpl,
        set:setImpl
    }

    function getImpl(name){
        return registry[name];
    }

    function setImpl(name, object){
        registry[name] = object;
    }

})();