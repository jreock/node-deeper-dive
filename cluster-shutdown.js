var cluster = require('cluster'); 
var http = require('http'); 

if (cluster.isPrimary) { 
  var numWorkers = require('os').cpus().length;
  var wids = [];

  console.log("Setting up " + numWorkers + " workers...");

  for (var i = 0; i < numWorkers; i++) { 
    cluster.fork(); 
  } 

  for (wid in cluster.workers) {
     wids.push(wid);
  }

  wids.forEach(function(wid) {
     cluster.workers[wid].send({
        type: 'shutdown',
        from: 'primary'
     });
  }); 

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online!');
  });

  cluster.on('exit', function(worker,code,signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code +
    ', and signal: ' + signal);
  });

} 
else { 
  http.createServer(function(req, res)    { 
    res.writeHead(200); 
    res.end('process ' + process.pid + ' says hello!'); 
  }).listen(8000); 
 
  process.on('message', function (message) {
    console.log(message);
    if (message.type === 'shutdown') {
       console.log('worker ' + process.pid + ' is shutting down!'); 
       process.exit(0);
    }
  });
}

