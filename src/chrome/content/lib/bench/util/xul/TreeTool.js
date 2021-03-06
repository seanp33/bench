dojo.provide('bench.util.xul.TreeTool');

dojo.require('bench.util.Util');
dojo.require('bench.storage.SQLiteStore');
dojo.require('bench.Loggable');

dojo.declare('bench.util.xul.TreeTool', bench.Loggable, {
    _tree:null,
    _treecols:null,
    _treechildren:null,
    _template:null,
    _logger:null,

    constructor:function(parent, attrs) {
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
        if (this._template == undefined) {

            this._template = dojo.create('template', null, this._tree);
            this._query = dojo.create('query', null, this._template);
            this._query.textContent = sql;
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
        } else {
            // TODO: revisit
            this._query.textContent = sql;
        }
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
    }

});