var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

// single import of all js modules used throughout dojo modules
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/FileUtils.jsm");
Cu.import("resource://bench.modules/log4moz.jsm");
Cu.import("resource://gre/modules/ctypes.jsm");

dojo.require('bench.App');
dojo.require('bench.simulation.DataGenerator');
dojo.require('bench.storage.ResultHandler');

// initialize logging harness
let formatter = new Log4Moz.BasicFormatter();
let root = Log4Moz.repository.rootLogger;
root.level = Log4Moz.Level["All"];
let capp = new Log4Moz.ConsoleAppender(formatter);
capp.level = Log4Moz.Level["All"];
root.addAppender(capp);

var Bench = {

    init:function() {
        Bench.app = new bench.App();
        Bench.app.run();
    },

    debugDescribe:function() {
        let store = Bench.app._store;
        store.open();

        let handler = new bench.storage.ResultHandler(
            function(aResultSet) {
                for (let row = aResultSet.getNextRow();
                     row;
                     row = aResultSet.getNextRow()) {

                    let name = row.getResultByName('name');
                    let type = row.getResultByName('type');

                    Application.console.log('name: ' + name + ', type: ' + type);
                }
            });

        store.describe('entities', handler);
    },

    debugCreateView:function(){
        let viewService = Bench.app._viewService;
        viewService.createView('srcPortLt3000', 'select * from entities where src_port < 3000');
    },

    runSimulation:function() {
        Application.console.log('running simulation...');
        dojo.byId('_bTestProgress').setAttribute('hidden', false);

        var self = this;

        let generator = new bench.simulation.DataGenerator(Bench.app._store, {
                handleCompletion:function(reason) {
                    if (reason == 0) {
                        self.selectSome();
                        dojo.byId('treeData').builder.rebuild();
                    }
                },

                handleError:null,
                handleResult:null
            }
        );

        let count = prompt("Specify number of records", 1000);
        generator.fill(count);
    },

    selectSome:function() {
        //var q = Bench.Store.Util.assembleSelect('raw_data', {dst_port:675});
        var q = 'select * from entities limit 200000';
        Application.console.log(q);

        let store = Bench.app._store;
        store.open();
        Application.console.log('Start: ' + new Date());
        store.sql(q, {
            handleError:function(error) {
                Application.console.log(error.result + " : " + error.message);
            },

            handleResult: function(aResultSet) {
                for (let row = aResultSet.getNextRow();
                     row;
                     row = aResultSet.getNextRow()) {

                    let src = row.getResultByName('src');
                    let src_port = row.getResultByName('src_port');
                    let dst = row.getResultByName('dst');
                    let dst_port = row.getResultByName('dst_port');
                }
            },

            handleCompletion:function(reason) {
                Application.console.log('Finish: ' + new Date());
                let store = Bench.app._store;
                store.close(true);
                dojo.byId('_bTestProgress').setAttribute('hidden', true);
            }
        });
    }
};

window.addEventListener("load", Bench.init, false);