Components.utils.import("resource://bench.modules/Context.jsm");

function onLoad(){
    var app = Context.get('bench.App');
    alert(app.echo('bench.App can echo?'));
}