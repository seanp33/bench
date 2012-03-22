dojo.provide('bench.util.Util');

dojo.declare('bench.util.Util', null, {});

bench.util.Util.jeval = function(jsStr) {
    return eval('(' + jsStr + ')');
}

bench.util.Util.dump = function(obj) {
    let log = Application.console.log;
    for (let p in obj) {
        log(p + ':' + obj[p]);
    }
}

bench.util.Util.deriveInstanceName = function(declaredClass) {
    let instanceName = declaredClass.substring(declaredClass.lastIndexOf(".") + 1);
    let firstChar = instanceName.substring(0, 1).toLowerCase();
    instanceName = instanceName.substring(1);
    return firstChar + instanceName;
}

bench.util.Util.dumpPaths = function() {
    const keys = ['AppRegF','AppRegD','DefRt','PrfDef','profDef','ProfDefNoLoc','DefProfRt','DefProfLRt','ARes','AChrom','APlugns','SrchPlugns','AChromDL','APluginsDL','SrchPluginsDL','SHARED','PrefD','PrefF','PrefDL','ExtPrefDL','PrefDOverride','ProfD','ProfLD','UChrm','UsrSrchPlugns','LclSt','UPnls','UMimTyp','cachePDir','BMarks','DLoads','SrchF','XPIClnupD','UStor'];
    let log = Application.console.log;
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (Services.dirsvc.has(key)) {
            log(key + ': ' + Services.dirsvc.get(key, Components.interfaces.nsIFile).path);
        } else {
            log('<' + key + '> not known to directory-service');
        }
    }
}

bench.util.Util.getPath = function(key) {
    if (Services.dirsvc.has(key)) {
        return Services.dirsvc.get(key, Components.interfaces.nsIFile).path;
    } else {
        throw "No path registered under :" + key;
    }
}

bench.util.Util.getExtPath = function() {
    return Components.classes["@mackerron.com/getExtDir;1"].createInstance().wrappedJSObject.getExtDir();
}

bench.util.Util.getOs = function() {
   return Services.appinfo.OS;
}