// NodeJS Deeper Dive
// This Node.js script reads the current file using the fs.readFile function. After the file is read, it sets up two 
// asynchronous actions. The first is a timeout that logs a message after 5000 milliseconds (or 5 seconds). The second 
// action uses setImmediate to schedule a log message as soon as Node.js finishes the current I/O events' callbacks. 
// It's worth noting that the setImmediate callback is likely to run before the setTimeout callback, even though 
// it's written afterwards, due to the nature of Node.js's event loop.

// We use the built-in Node.js 'fs' module to read files from the file system
const fs = require('fs');

// We're going to read the current file, using the special '__filename' variable
fs.readFile(__filename, () => {

  // After the file is read, we set a timeout to log a message after 5000 milliseconds (5 seconds)
  setTimeout(() => {
    console.log("Timeout completed after 5000 milliseconds");
  }, 5000);

  // We also set an immediate action to log a message as soon as the current I/O events callbacks are done
  setImmediate(() => {
    console.log("Immediate action completed");
  });

});
