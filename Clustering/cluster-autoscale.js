// NodeJS Deeper Dive
// This code leverages the Node.js Cluster module to create a multi-process HTTP server. When the current process 
// is the primary, it spawns a number of worker processes equal to the number of CPU cores available. It then sets up 
// event handlers to monitor the online status and exit status of these workers. When a worker exits, a new one is 
// immediately created to replace it. The worker processes, on the other hand, are responsible for 
// creating an HTTP server and listening for requests on port 8000.

// Importing the required modules
const cluster = require('cluster'); 
const http = require('http');
const os = require('os');

// Checking if the current process is the primary
if (cluster.isPrimary) { 

  // Setting the number of workers equal to the number of CPU cores
  const numWorkers = os.cpus().length;

  console.log(`Setting up ${numWorkers} workers...`);

  // Creating a new worker for each CPU core
  for (let i = 0; i < numWorkers; i++) { 
    cluster.fork(); 
  } 

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
}
