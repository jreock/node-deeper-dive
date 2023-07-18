//NodeJS Deeper Dive
// This code demonstrates the use of Node.js' Cluster module to create a multi-process HTTP server. The master process 
// forks worker processes for each CPU core and sets up event handlers for when workers come online or exit. Each worker 
// process sets up an HTTP server and an event handler for receiving messages from the master. The communication between 
// the master and workers is demonstrated via the 'message' event.

// Importing the necessary modules
const cluster = require('cluster'); 
const http = require('http'); 
const os = require('os');

// Checking if the current process is the master
if (cluster.isMaster) { 

  // Getting the number of CPU cores
  const numWorkers = os.cpus().length;

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

  // Sending a message to each worker
  workerIDs.forEach(workerID => {
     cluster.workers[workerID].send({
        text: 'hi there!',
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
    console.log('Starting a new worker');
    cluster.fork();
  });

} else { 

  // The worker processes create an HTTP server
  http.createServer((req, res) => { 
    res.writeHead(200); 
    res.end(`process ${process.pid} says hello!`); 
  }).listen(8000); 

  // Event handler for receiving a message from the master
  process.on('message', message => {
    console.log(message);
  });
}
