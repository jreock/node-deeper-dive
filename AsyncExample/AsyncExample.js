// NodeJS Deeper Dive
// This script demonstrates Node.js's non-blocking I/O model. The fs.readFile method is called to read a file named 
// 'textfile'. This function takes the name of the file and a callback function as arguments. The callback function, 
// rfCallback, logs the contents of the file if reading is successful, or an error message if an error occurs. The statement 
// "Hooray non-blocking!" is printed immediately after the readFile call, demonstrating that Node.js does not wait for 
// the file read operation to complete before moving on to the next line of code.


// First, we import the 'fs' module, which provides an API for interacting with the file system.
const fs = require('fs');

// We define a callback function 'rfCallback' to be used with the 'readFile' method.
// This function takes two parameters: 'err' for any error that occurred and 'data' for the content of the file.
// If an error occurred, we log it to the console and return. Otherwise, we log the file content to the console.
const rfCallback = (err, data) => {
    if (err) { 
        console.error(err);
        return;
    }
    console.log(data.toString());
};

// We call the 'readFile' method with the path of the file we want to read and our callback function.
// The 'readFile' method is non-blocking, so it will return immediately and our callback function will be invoked when the file has been read.
fs.readFile('./textfile', rfCallback);

// This log statement will likely be executed before the 'readFile' method has finished, 
// demonstrating the non-blocking nature of the 'readFile' method.
console.log("Hooray non-blocking!");
