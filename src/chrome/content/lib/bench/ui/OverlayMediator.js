dojo.provide('bench.ui.OverlayMediator');

dojo.require('bench.ui.Mediator');
dojo.require('bench.util.Util');

/**
   Mediator responsible for interfacing the overlay.xul and the services
 */
dojo.declare('bench.ui.OverlayMediator', bench.ui.Mediator, {

    constructor:function(){
        this._initCommands();
    },

    _initCommands:function() {
        this.commands['cmd_doThatSht'] = this.cmd_doThatSht;
    },

    cmd_doThatSht:function() {
        this._logger.debug('ok, now I\'m doing that sht! from OverlayMediator');
    }

});
