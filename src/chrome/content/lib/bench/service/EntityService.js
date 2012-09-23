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

    mapGraph:function(nodeFunction, edgeFunction, drawFunction){
        let self = this;
        var nodes = [];
        let handler = new bench.storage.ResultHandler(
            function(aResultSet) {
                for (let row = aResultSet.getNextRow();
                     row;
                     row = aResultSet.getNextRow()) {
                    let src = row.getResultByName('src');
                    let src_port = row.getResultByName('src_port');
                    let dst = row.getResultByName('dst');
                    let dst_port = row.getResultByName('dst_port');

                    nodes.push({src:src, dst:dst});

                    nodeFunction({id:src, label:src, x:Math.random(), y:Math.random()});
                    nodeFunction({id:dst, label:dst, x:Math.random(), y:Math.random()});
                }

                drawFunction();

            },

            function(){
                for(var i=0;i<nodes.length;i++){
                    var pair = nodes[i];
                    self._logger.debug(pair.src + ' > ' + pair.dst);
                    edgeFunction(pair.src, pair.dst);
                }

                drawFunction();
            }
        );

        this._store.open();
        this._store.sql('select * from entities', handler);
        this._store.close();
    }

});

bench.service.EntityService.CREATE_TABLE = "CREATE TABLE IF NOT EXISTS entities (id INTEGER PRIMARY KEY AUTOINCREMENT, src TEXT, src_port INTEGER, dst TEXT, dst_port INTEGER)";