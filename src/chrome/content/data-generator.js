function execute(count){
    
    var sqlStatements = [];
            
    for(var i=0;i<count;i++){
        var src = randIp(255);
        var srcPort = rand(100, 9000);
        var dst = randIp(255);
        var dstPort = rand(100, 9000);
        var sql = "INSERT into raw_data (src, src_port, dst, dst_port) VALUES('" + src + "', " + srcPort + ", '" + dst + "', "  + dstPort + ")";
        sqlStatements.push(sql);
        
    }
    
    postMessage(sqlStatements);
    
}

function rand(min, max){
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
    
function randIp(){
    var firstbyte  = Math.round(Math.random()*255);
    var secondbyte = Math.round(Math.random()*255);
    var thirdbyte  = Math.round(Math.random()*255);
    var fourthbyte = Math.round(Math.random()*255);

    return firstbyte+'.'+secondbyte+'.'+thirdbyte+'.'+fourthbyte;
}

    
onmessage = function(event) {
  if (event.data) {
    var count = event.data;    
    execute(count);
  }else{
    postMessage([]);
  }
}
