// NodeJS Deeper Dive
// This code creates a multi-process HTTP server using Node.js' Cluster module. The main process creates 
// a fixed number of worker processes, instead of basing it on the number of CPU cores. The main process also sends a shutdown 
// message to each worker process. If a worker process receives a shutdown message, it gracefully shuts itself down.

// Importing the necessary modules
const cluster = require('cluster'); 
const http = require('http'); 

// Checking if the current process is the master
if (cluster.isPrimary) { 

  // Setting the number of workers explicitly
  const numWorkers = 4;

  // Array to hold worker ids
  let workerIDs = [];

  console.log(`Setting up ${numWorkers} workers...`);

  // Creating a new worker for each CPU core
  for (let i = 0; i < numWorkers; i++) { 
    cluster.fork(); 
  } 

  // Populating the workerIDs array with worker ids
  for (let workerID in cluster.workers) {
     workerIDs.push(workerID);
  }

  // Sending a shutdown message to each worker
  workerIDs.forEach(workerID => {
     cluster.workers[workerID].send({
        type: 'shutdown',
        from: 'master'
     });
  });

  // Event handler for when a worker comes online
  cluster.on('online', worker => {
    console.log(`Worker ${worker.process.pid} is online!`);
  });

  // Event handler for when a worker exits
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
  });

} else { 

  // The worker processes create an HTTP server
  http.createServer((req, res) => { 
    res.writeHead(200); 
    res.end(`process ${process.pid} says hello!`); 
  }).listen(8000); 

  // Event handler for receiving a message from the master
  process.on('message', message => {
    if (message.type === 'shutdown') {
      console.log(`Shutting down worker ${process.pid}`);
      process.exit(0);
    }
  });
}
