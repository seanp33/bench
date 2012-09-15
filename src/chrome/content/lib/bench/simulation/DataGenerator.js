dojo.provide('bench.simulation.DataGenerator');

dojo.require('bench.Loggable');

dojo.declare('bench.simulation.DataGenerator', bench.Loggable, {

    _store:null,
    _handler:null,

    constructor:function(store, handler){
        this._store = store;
        this._handler = handler;
    },

    fill:function(recordCount) {
        this._logger.debug("...filling " + recordCount);
        var worker = new ChromeWorker("chrome://bench/content/lib/bench/simulation/dataworker.js");
        this._logger.debug("....worker created");

        let self = this;
        worker.onmessage = function(event) {
            self.executeStatements(event.data);
        };

        worker.onerror = function(event) {
            this._logger.error("### worker error: " + event);
        };

        worker.postMessage(recordCount);
    },

    executeStatements:function(sqlStatements) {
        var count = sqlStatements.length;

        this._logger.debug("..." + count + " generated");

        var stmts = [];

        if (!this._store._opened) {
            this._store.open();
        }

        for (var i = 0; i < count; i++) {
            stmts.push(this._store.conn.createStatement(sqlStatements[i]));
        }

        this._store.conn.executeAsync(stmts, count, this._handler);

        this._store.close();
    }
});