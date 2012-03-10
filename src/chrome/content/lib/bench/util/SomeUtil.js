dojo.provide('bench.util.SomeUtil');

dojo.declare('bench.util.SomeUtil',null,{});

bench.util.SomeUtil.trace = function(msg){
    Application.console.log('TRACE: ' + msg);
}