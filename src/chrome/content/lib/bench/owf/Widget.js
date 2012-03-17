dojo.provide('bench.owf.Widget');

dojo.require('bench.util.Util');

dojo.declare('bench.owf.Widget', null, {

    document:null,
    id:null,
    containerVersion:null,
    webContextPath:null,
    preferenceLocation:null,
    relayUrl:null,
    lang:null,
    owf:null,

    constructor:function(document, data) {
        this.document = document;
        this.id = data.id;
        this.containerVersion = data.containerVersion;
        this.webContextPath = data.webContextPath;
        this.preferenceLocation = data.preferenceLocation;
        this.relayUrl = data.relayUrl;
        this.lang = data.lang;
        this.owf = data.owf;
    }

});