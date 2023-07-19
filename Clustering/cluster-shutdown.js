// NodeJS Deeper Dive
// This code utilizes the Node.js Cluster module to create a multi-process HTTP server. The primary process spawns worker 
// processes equivalent to the number of CPU cores. These workers are stored in an array, and each worker is sent a 
// shutdown message from the primary process. There are event handlers to monitor the online status and exit status of 
// the workers. The worker processes themselves create an HTTP server and listen for incoming requests on port 8000, and 
// they also listen for incoming messages from the primary process, initiating a graceful shutdown upon receiving a 
// shutdown message.

// Importing necessary modules
const cluster = require('cluster'); 
const http = require('http'); 
const os = require('os');

// Checking if the current process is the primary
if (cluster.isPrimary) { 

  // Setting the number of workers equal to the number of CPU cores
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

  // Worker processes create an HTTP server
  http.createServer((req, res) => { 
    res.writeHead(200); 
    res.end(`process ${process.pid} says hello!`); 
  }).listen(8000); 

  // Event handler for receiving a message from the primary
  process.on('message', message => {
    console.log(message);
    if (message.type === 'shutdown') {
      console.log(`Worker ${process.pid} is shutting down!`);
      process.exit(0);
    }
  });
}
