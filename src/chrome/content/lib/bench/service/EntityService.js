dojo.provide('bench.service.EntityService');

dojo.require('bench.util.SomeUtil');

dojo.declare('bench.service.EntityService',null,{
    constructor:function(){
        Application.console.log('bench.service.EntityService is here');
        bench.util.SomeUtil.trace('bench.service.EntityService is here');
    },

    service:function(){
        bench.util.SomeUtil.trace('bench.service.EntityService#service');
    }
});