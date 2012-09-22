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

        function(src, srcPort, dst, dstPort) {
            try {
                var id = src + ':' + srcPort + ' > ' + dst + ':' + dstPort;
                sigInst.addEdge(src, dst);
            } catch(e) {
                console.error(e);
            }
        },

        function() {
            sigInst.draw();
        }
    );

    sigInst = sigma.init(document.getElementById('sigma-example'))
        .drawingProperties({
            defaultLabelColor: '#fff',
            defaultLabelSize: 14,
            defaultLabelBGColor: '#fff',
            defaultLabelHoverColor: '#000',
            labelThreshold: 6,
            defaultEdgeType: 'curve'
        }).graphProperties({
            minNodeSize: 0.5,
            maxNodeSize: 5,
            minEdgeSize: 1,
            maxEdgeSize: 1
        }).mouseProperties({
            maxRatio: 4
        });

}