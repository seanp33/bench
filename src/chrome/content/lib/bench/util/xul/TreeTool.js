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

    bindTo:function(sql) {
        /**
         * <tree>
         *     <treecols>
         *       <treecol></treecol>
         *     </treecols>
         *     <template>
         *         <query></query>
         *         <action>
         *             <treechildren>
         *                 <treeitem>
         *                     <treerow>
         *                         <treecell></treecell>
         *                     </treerow>
         *                 </treeitem>
         *             </treechildren>
         *          </action>
         *     </template>
         * <tree>
         *
         */
        this._template = dojo.create('template', null, this._tree);
        let query = dojo.create('query', null, this._template);
        query.textContent = sql;
        let action = dojo.create('action', null, this._template);
        this._treechildren = dojo.create('treechildren', null, action);
        let treeitem = dojo.create('treeitem', {uri:'?'}, this._treechildren);
        this._treerow = dojo.create('treerow', null, treeitem);

        let id = dojo.attr(this._tree, 'id');
        let self = this;
        dojo.query('#' + id + ' > treecols > treecol').forEach(function(node, index, nodelist) {
            let sort = dojo.attr(node, 'sort');
            // this oddity, utilizing the column's sort as a label, is a bit of a cheat, but because a template's
            // label and column's sort are identical, we do this here
            dojo.create('treecell', {label:sort}, self._treerow);
        });

        var inHTML = (new XMLSerializer()).serializeToString(this._tree);
        this._logger.debug(inHTML);
    },

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