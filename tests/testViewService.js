var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

var JUM = {};
Cu.import("resource://mozmill/modules/jum.js", JUM);

// prepare window and FUEL for injecting into extension
var fuelApplication = Components.classes["@mozilla.org/fuel/application;1"].getService(Components.interfaces.fuelIApplication);
var window = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator).getMostRecentWindow('navigator:browser');
var document = window.document;
var navigator = window.navigator;

// and prepare a scope to satisfy overlay dependencies
var UNIT= {
    window:window,
    document:document,
    navigator:navigator
}

var setupModule = function(module) {
    module.controller = mozmill.getBrowserController();
    Cu.import("resource://bench.modules/log4moz.jsm");

    var js_loader = Cc['@mozilla.org/moz/jssubscript-loader;1'].getService(Ci.mozIJSSubScriptLoader);
    js_loader.loadSubScript('chrome://bench/content/lib/dojo/dojo.js', UNIT);
    js_loader.loadSubScript('chrome://bench/content/lib/bench/Loggable.js', UNIT);
    js_loader.loadSubScript('chrome://bench/content/lib/bench/SmokeTest.js', this);
    //js_loader.loadSubScript('chrome://bench/content/lib/bench/storage/SQLiteStore.js', UNIT);
    //js_loader.loadSubScript('chrome://bench/content/lib/bench/storage/ResultHandler.js', UNIT);
    js_loader.loadSubScript('chrome://bench/content/lib/bench/service/ViewService.js', UNIT);
}

function testSmokeTest() {
    //JUM.assertEquals('hello', SmokeTest.echo('hello'));
}


function testPrepValue() {
    //let viewService = new bench.service.ViewService(null);
    //JUM.assertEquals('SOME_VIEW_V', viewService.prepareViewName('SOME_VIEW'));
}