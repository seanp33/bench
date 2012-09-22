dojo.provide('bench.service.EntityService');

dojo.require('bench.Loggable');

dojo.declare('bench.service.EntityService', bench.Loggable, {

    _store:null,

    constructor:function(store) {
        this._store = store;
        this._initLogging();
        this._initializeStore();
    },

    _initializeStore:function() {
        this._store.open();
        this._store.sql(bench.service.EntityService.CREATE_TABLE);
        this._store.close();
    },

    mapGraph:function(nodeFunction, edgeFunction, completeFunction){
        let self = this;
        let handler = new bench.storage.ResultHandler(
            function(aResultSet) {
                for (let row = aResultSet.getNextRow();
                     row;
                     row = aResultSet.getNextRow()) {
                    let src = row.getResultByName('src');
                    let src_port = row.getResultByName('src_port');
                    let dst = row.getResultByName('dst');
                    let dst_port = row.getResultByName('dst_port');
                    nodeFunction({id:src, label:src, x:Math.random(), y:Math.random()});
                    nodeFunction({id:src, label:src, x:Math.random(), y:Math.random()});
                    edgeFunction(src, src_port, dst, dst_port);
                }
            },

            function(){
                completeFunction();
            }
        );

        this._store.open();
        this._store.sql('select * from entities', handler);
        this._store.close();
    }

});

bench.service.EntityService.CREATE_TABLE = "CREATE TABLE IF NOT EXISTS entities (id INTEGER PRIMARY KEY AUTOINCREMENT, src TEXT, src_port INTEGER, dst TEXT, dst_port INTEGER)";