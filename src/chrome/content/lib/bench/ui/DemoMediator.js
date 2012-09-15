dojo.provide('bench.ui.DemoMediator');

dojo.require('bench.ui.Mediator');

dojo.require('bench.util.Util');

/**
 A collection of handlers to assist as we build out the bench
 */
dojo.declare('bench.ui.DemoMediator', bench.ui.Mediator, {

    _store:null,

    constructor:function(store) {
        this._store = store;
        this._initCommands();
    },

    _initCommands:function() {
        this.commands['cmd_demoDescribeTable'] = this.cmd_demoDescribeTable;
    },

    cmd_demoDescribeTable:function() {
        this._logger.debug('cmd_demoDescribeTable');
        let self = this;
        this._store.open();
        this._store.describe('entities', new bench.storage.ResultHandler(
            function(aResultSet) {
                for (let row = aResultSet.getNextRow();
                     row;
                     row = aResultSet.getNextRow()) {

                    let name = row.getResultByName('name');
                    let type = row.getResultByName('type');

                    Application.console.log('name: ' + name + ', type: ' + type);
                }

                self._store.close();
            })
        )
    }
});