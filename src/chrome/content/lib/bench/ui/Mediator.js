dojo.provide('bench.ui.Mediator');

dojo.require('bench.Loggable');

/**
 Base implementation of nsIController providing core ui mediation functions. Subclasses of bench.ui.Mediator are intended
 to added commands to the the commands map as this.commands['myCommand'] = this._myCommandImpl;
 */
dojo.declare('bench.ui.Mediator', bench.Loggable, {

    // collection of supported commands
    commands:{},

    constructor:function(view) {
        this._view = view;
        this._view.controllers.appendController(this);
    },

    destroy:function() {
        this._view.controllers.removeController(this);
        this.commands = {};
    },

    supportsCommand:function (cmd) {
        return cmd in this.commands;
    },

    doCommand:function (cmd) {
        let command = this[cmd];
        if (command != undefined) {
            command.call(this);
        }
    },

    isCommandEnabled:function (cmd) {
        return true;
    },

    onEvent:function (event_name) {
        this._logger.debug('isCommandEnabled ' + cmd);
    }

});
