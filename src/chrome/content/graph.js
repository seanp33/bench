Components.utils.import("resource://bench.modules/Context.jsm");

var sigInst = null;

function onLoad() {
    var app = Context.get('bench.App');

    var entityService = Context.get('bench.service.EntityService');
    if (entityService == undefined) throw new Error('bench.service.EntityService was not found within context');

    // create graph
    entityService.mapGraph(
        function(node) {
            try {
                sigInst.addNode(node.id, node);
            } catch(e) {
                console.error(e);
            }
        },

        function(src, dst) {
            try {
                sigInst.addEdge(src+'>'+dst, src, dst);
            } catch(e) {
                alert('edge failed: ' + src + ' > ' + dst);
            }
        },

        function() {
            sigInst.draw();
        }
    );

    sigInst = sigma.init(document.getElementById('sigma-example'))
        .drawingProperties({
            defaultLabelColor: '#000',
            defaultLabelSize: 14,
            defaultLabelBGColor: '#000',
            defaultLabelHoverColor: 'red',
            labelThreshold: 6,
            defaultEdgeType: 'curve',
            defaultEdgeColor: 'red'
        }).graphProperties({
            minNodeSize: 0.5,
            maxNodeSize: 5,
            minEdgeSize: 1,
            maxEdgeSize: 1
        }).mouseProperties({
            maxRatio: 20
        });

}