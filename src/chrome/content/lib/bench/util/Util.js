dojo.provide('bench.util.Util');

dojo.declare('bench.util.Util',null,{});

bench.util.Util.jeval = function(jsStr){
    return eval('(' + jsStr + ')');
}