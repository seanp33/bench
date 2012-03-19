dojo.provide('bench.service.IndexService');

/**
 * IndexService maintains an in-memory index of 'targets' keyed by a collection of tags
 * IndexService allows for store, recall and clear functions.
 */

// TODO: consider defining an IndexService promise or some other abstraction of an 'indexed target'
dojo.declare('bench.service.IndexService',null,{

    constructor:function(){
        this._initLogging();
    },

    index:function(tags, target){
        // update index
    },

    recall:function(tags){
        // return collection of targets from index, keyed by tags
    },

    clear:function(tags){
        // clear index of entities for given tags
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.service.IndexService');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});