//NodeJS Deeper Dive
// This Node.js script uses the 'fs' (file system) module to create two writable streams, which are linked to 'app.log' 
// and 'error.log' files respectively. It then creates a new 'myConsole' object using the console.Console() constructor, 
// specifying the earlier created streams for standard output and error output. Now, whenever a log, error, or warning is 
// issued using this 'myConsole' object, those entries get written into 'app.log' and 'error.log' files instead of the console, 
// helping in keeping a persistent log of application events and errors.

// Import the 'fs' module, which provides utilities for working with the file system in Node.js
const fs = require('fs');

// Create writable streams for the application log and error log files
const out = fs.createWriteStream('./app.log');
const err = fs.createWriteStream('./error.log');

// Construct a new console object that writes its output to the defined files
const myConsole = new console.Console(out, err);

// Use the custom console object to log a message to the application log
myConsole.log('hello world');

// Use the custom console object to log an error message to the error log
myConsole.error(new Error('bad error!!'));

// Use the custom console object to log a warning message to the application log
myConsole.warn('oooooh a warning!');
