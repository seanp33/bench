dojo.provide('bench.util.xul.TreeTool');

dojo.require('bench.util.Util');
dojo.require('bench.storage.SQLiteStore');

dojo.declare('bench.util.xul.TreeTool', null, {
    _tree:null,
    _treecols:null,
    _treechildren:null,
    _template:null,
    _logger:null,

    constructor:function(parent, attrs) {
        this._initLogging();
        this._tree = dojo.create('tree', attrs, parent);
        this._treecols = dojo.create('treecols', null, this._tree);
    },

    addColumn:function(attrs) {
        dojo.create('treecol', attrs, this._treecols);
    },

    bind:function(sql) {

        this._template = dojo.create('template', null, this._treechildren);
        let query = dojo.create('query', {innerText:sql}, this._template);
        let action = dojo.create('action', null, this._template);
        this._treechildren = dojo.create('treechildren', null, action);
        let treeitem = dojo.create('treeitem', {uri:'?'}, action);
        let treerow = dojo.create('treerow', null, treeitem);

        let id = dojo.attr(this._tree, 'id');
        let self = this;
        dojo.query('#' + id + ' > treecols > treecol').forEach(function(node, index, nodelist) {
            let sort = dojo.attr(node, 'sort');
            // this oddity, utilizing the column's sort as a label, is a bit of a cheat, but because a template's
            // label and column's sort are identical, we do this here
            dojo.create('treecell', {label:sort}, treeitem);
        });
    },

    /**
     * tree datasources="profile:messages.sqlite" ref="*"
     querytype="storage" flags="dont-build-content">
     <treecols>
     <treecol id="subject" label="Subject" flex="3"/>
     <treecol id="sender" label="Sender" flex="2"/>
     <treecol id="date" label="Date" flex="1"/>
     </treecols>
     <template>
     <query>
     select subject, sender, date from messages
     </query>
     <action>
     <treechildren>
     <treeitem uri="?">
     <treerow>
     <treecell label="?subject"/>
     <treecell label="?sender"/>
     <treecell label="?date"/>
     </treerow>
     </treeitem>
     </treechildren>
     </action>
     </template>
     </tree>
     */

    rebuild:function() {
        this._tree.builder.rebuild();
        ;
    },

    hideColumn:function(id) {
        // TODO: obtain treecol by id?
        // and dojo.style... to hide
    },

    getTree:function() {
        return this._tree;
    },

    _initLogging:function() {
        this._logger = Log4Moz.repository.getLogger('bench.util.xul.TreeTool');
        this._logger.level = Log4Moz.Level['Debug'];
    }
});