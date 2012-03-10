var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

var {assert, expect} = require("lib/assertions");

// prepare window and FUEL for injecting into extension
var fuelApplication = Cc["@mozilla.org/fuel/application;1"].getService(Ci.fuelIApplication);
var window = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator).getMostRecentWindow('navigator:browser');

// prep a script loader to oad the overlay
var js_loader = Cc['@mozilla.org/moz/jssubscript-loader;1'].getService(Ci.mozIJSSubScriptLoader);

var __ = { Application:fuelApplication, window:window }

var setupModule = function(module) {
     module.controller = mozmill.getBrowserController();
     js_loader.loadSubScript('chrome://bench/content/overlay.js',__);     
 }
 
function teardownModule(module) {
  assert.ok(true,'>>>>>>>>>>>>>>>>> this is the end....beautiful friend, this is the end....my only friend, the end');
}


function testIt(){
     //assert.ok(true,  logging to std.out is alive and well");
     
     let ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
        
     let resHandler = ios.getProtocolHandler("resource").QueryInterface(Ci.nsIResProtocolHandler);
      
     try{          
          __.LOG("pookie before: " + resHandler.getSubstitution("pookie").spec);
          // let pookieTmp = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("TmpD", Ci.nsILocalFile);
          var pookieTmp = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
          pookieTmp.initWithPath('/tmp/pookie');
          let pookieTmpURI = ios.newFileURI(pookieTmp);
          resHandler.setSubstitution('pookie', pookieTmpURI);
          __.LOG("pookie after: " + resHandler.getSubstitution("pookie").spec);            
     }catch(error){
          __.LOG(error);
     }
 }