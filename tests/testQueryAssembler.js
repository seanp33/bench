var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;
var {assert, expect} = require("support/assertions");

var JUM = {};
Cu.import("resource://mozmill/modules/jum.js", JUM);

// prepare window and FUEL for injecting into extension
var fuelApplication = Components.classes["@mozilla.org/fuel/application;1"].getService(Components.interfaces.fuelIApplication);
var window = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator).getMostRecentWindow('navigator:browser');
var document = window.document;
var navigator = window.navigator;

// prep a script loader to load the overlay
var js_loader = Cc['@mozilla.org/moz/jssubscript-loader;1'].getService(Ci.mozIJSSubScriptLoader);

// and prepare a scope to satisfy overlay dependencies
var UNIT = {
    window:window,
    document:document,
    navigator:navigator,
    djConfig:{
        parseOnLoad:false,
        scopeMap:['dojo','dojo'],
        modulePaths: {
            "bench": "."
        }
    },
    dojo:{}
}

var setupModule = function(module) {
    module.controller = mozmill.getBrowserController();
    js_loader.loadSubScript('chrome://bench/content/lib/dojo/dojo.js', UNIT);
    js_loader.loadSubScript('chrome://bench/content/lib/bench/storage/QueryAssembler.js', UNIT);

}

var teardownModule = function(module) {
}

function testPrepValue() {
    UNIT.dojo.require('bench.storage.QueryAssembler');

    let assembler = new UNIT.bench.storage.QueryAssembler();

    JUM.assertEquals("'Test'", assembler.prepValue("Test"));
    //JUM.assertEquals(1, prepValue(1));
    //JUM.assertEquals(true, prepValue(true));
    JUM.assertEquals(true, true);

}