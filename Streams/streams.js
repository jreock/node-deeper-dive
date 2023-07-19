// NodeJS Deeper Dive
// This Node.js script demonstrates the use of streams and events to read data from a file, input.txt, and write it to another file, output.txt, 
// in a scalable and efficient manner. It uses Readable and Writable streams from the 'fs' (File System) module, and leverages 'data', 'end', 'finish', 
// and 'error' events to manage the flow of data and handle potential errors. The script reads from input.txt in chunks, immediately writing 
// each chunk to output.txt, thus minimizing memory usage. Status messages are logged to the console at each step to provide insight into 
// the process and any errors that may occur.

const fs = require('fs');

// Create readable stream for input file
const readStream = fs.createReadStream('input.txt');

// Create writable stream for output file
const writeStream = fs.createWriteStream('output.txt');

// Event handler for the 'data' event
readStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
    writeStream.write(chunk);
});

// Event handler for the 'end' event
readStream.on('end', () => {
    console.log('There is no more data to read.');
    writeStream.end(); // Close the writable stream
});

// Event handler for the 'finish' event of the writable stream
writeStream.on('finish', () => {
    console.log('All data has been written to output file.');
});

// Event handler for the 'error' event
readStream.on('error', (err) => {
    console.error(`An error has occurred while reading: ${err.message}`);
});

writeStream.on('error', (err) => {
    console.error(`An error has occurred while writing: ${err.message}`);
});
