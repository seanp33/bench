dojo.provide('bench.util.Util');

dojo.declare('bench.util.Util',null,{});

bench.util.Util.jeval = function(jsStr){
    return eval('(' + jsStr + ')');
}

bench.util.Util.dump = function(obj){
    let log = Application.console.log();
    for(let p in obj){
        log.debug(p + ':' + obj[p]);
    }

}