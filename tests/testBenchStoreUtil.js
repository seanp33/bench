var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;
var {assert, expect} = require("lib/assertions");

var $ = {};
Cu.import("resource://mozmill/modules/jum.js", $);

// prepare window and FUEL for injecting into extension
var fuelApplication = Components.classes["@mozilla.org/fuel/application;1"].getService(Components.interfaces.fuelIApplication);
var window = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator).getMostRecentWindow('navigator:browser');

// prep a script loader to oad the overlay
var js_loader = Cc['@mozilla.org/moz/jssubscript-loader;1'].getService(Ci.mozIJSSubScriptLoader);

// and prepare a scope to satisfy overlay dependencies
var __ = { Application:fuelApplication, window:window }

var setupModule = function(module) {
     module.controller = mozmill.getBrowserController();
     js_loader.loadSubScript('chrome://bench/content/overlay.js',__);     
 }
 
function testPrepValue(){
     let prepValue = __.Bench.Store.Util.prepValue
     $.assertEquals("'Test'", prepValue("Test"));
     $.assertEquals(1, prepValue(1));
     $.assertEquals(true, prepValue(true));
}

function testAssembleSelect(){
    var q = __.Bench.Store.Util.assembleSelect('FOO', {name:'Sean', happy:true, age:36});
    assert.equal(q, "SELECT * FROM FOO WHERE name='Sean' AND happy=true AND age=36;", 'assembled select was not correct');
}

function testAssembleInsert(){
    var q = __.Bench.Store.Util.assembleInsert('FOO', {name:'Sean', happy:true, age:36});
    assert.equal(q, "INSERT into FOO (name,happy,age) VALUES('Sean',true,36);", 'assembled insert was not correct');
}

function testAssembleDelete(){
    var q = __.Bench.Store.Util.assembleDelete('FOO', {name:'Sean', happy:true, age:36});
    assert.equal(q, "DELETE FROM FOO WHERE name='Sean' AND happy=true AND age=36;", 'assembled delete was not correct');
}

function testAssembleUpdate(){
    var q = __.Bench.Store.Util.assembleUpdate('FOO', 'fid', {fid:1234, name:'Sean', happy:true, age:36});
    assert.equal(q, "UPDATE FOO SET name='Sean', happy=true, age=36 WHERE fid=1234;", 'assembled update was not correct');
}