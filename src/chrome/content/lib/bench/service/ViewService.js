dojo.provide('bench.service.ViewService');

dojo.require('bench.util.Util');

    dojo.declare('bench.service.ViewService', null, {
    views:{},
    _store:null,

    constructor:function(store) {
        this._store = store;
        this.refreshViewsFromStore();
        this._initLogging();
    },

    createView:function(key, select) {
        this._store.open();
        this._store.sql('CREATE VIEW IF NOT EXISTS ' + this.prepareViewName(key) + ' AS ' + select + ';');
        this._store.close();
        this._logger.debug('created view ' + this.prepareViewName(key));
    },

    dropView:function(key) {
        this._store.open();
        this._store.sql('DROP VIEW IF EXISTS ' + this.prepareViewName(key) + ';');
        this._store.close();
        this._logger.debug('dropped view ' + this.prepareViewName(key));
    },

    prepareViewName:function(key) {
        return key.toUpperCase() + '_V';
    },

    refreshViewsFromStore:function() {
        let self = this;
        let handler = new bench.storage.ResultHandler(
            function(aResultSet) {
                for (let row = aResultSet.getNextRow();
                     row;
                     row = aResultSet.getNextRow()) {

                    let name = row.getResultByName('name');
                    let sql = row.getResultByName('sql');
                    self.views[name] = sql;

                    bench.util.Util.dump(self.views);
                }
            }
        );

        this._store.open();
        this._store.sql(bench.service.ViewService.SELECT_VIEWS, handler);
        this._store.close(true);
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.service.ViewService');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});

bench.service.ViewService.SELECT_VIEWS = "SELECT name, sql FROM sqlite_master WHERE type = 'view';";