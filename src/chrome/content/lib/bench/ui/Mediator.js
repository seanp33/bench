dojo.provide('bench.ui.Mediator');

dojo.require('bench.Loggable');
dojo.require('bench.util.Util');

/**
 Base mediation functions. Subclasses of bench.ui.Mediator are expected to add commands to the the commands map as
 this.commands['myCommand'] = this._myCommandImpl;
 */
dojo.declare('bench.ui.Mediator', bench.Loggable, {

    // collection of supported commands
    commands:{},

    handles:function (cmd) {
         this._logger.debug('supportsCommand?  ' + cmd + '? ');
        return cmd in this.commands;
    },

    perform:function (cmd) {
        let command = this[cmd];
        if (command != undefined) {
            command.call(this);
        }
    }
});
