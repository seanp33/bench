dojo.provide('bench.storage.SQLiteStore');

dojo.require('bench.util.SomeUtil');

dojo.declare('bench.storage.SQLiteStore',null,{
    constructor:function(){
        Application.console.log('bench.storage.SQLiteStore is here');
        bench.util.SomeUtil.trace('bench.storage.SQLiteStore is here');
    },

    store:function(){
        bench.util.SomeUtil.trace('bench.storage.SQLiteStore#store');
    }
});