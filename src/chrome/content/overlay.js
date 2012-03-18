var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/FileUtils.jsm");
Cu.import("resource://bench.modules/log4moz.jsm");

dojo.require('bench.App');
dojo.require('bench.simulation.DataGenerator');

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

    runSimulation:function() {
        Application.console.log('running simulation...');
        // TODO: use dojo.query here instead
        dojo.byId('_bTestProgress').setAttribute('hidden', false);

        var self = this;
        let generator = new bench.simulation.DataGenerator(Bench.app._entityStore, {
                handleCompletion:function(reason) {
                    let msg;
                    switch (reason) {
                        case 0 :
                            msg = 'REASON_FINISHED';
                            break;
                        case 1 :
                            msg = 'REASON_CANCELED';
                            break;
                        case 2   :
                            msg = 'REASON_ERROR';
                            break;
                    }

                    Application.console.log('handleCompletion: ' + msg);

                    if (reason == 0) {
                        self.selectSome();
                        dojo.byId('treeData').builder.rebuild();
                    }
                },

                handleError:function(error) {
                    Application.console.log(error.result + " : " + error.message);
                },

                handleResult:function(resultSet) {
                    Application.console.log('handleResult');
                }
            }
        );

        let count = prompt("Specify number of records", 1000);
        generator.fill(count);
    },

    selectSome:function() {
        //var q = Bench.Store.Util.assembleSelect('raw_data', {dst_port:675});
        var q = 'select * from raw_data limit 200000';
        Application.console.log(q);

        let store = Bench.app._entityStore;
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
                let store = Bench.app._entityStore;
                store.close(true);

                // TODO: use dojo.query
                dojo.byId('_bTestProgress').setAttribute('hidden', true);
            }
        });
    }
};

window.addEventListener("load", Bench.init, false);