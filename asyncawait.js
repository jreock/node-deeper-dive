// NodeJS Deeper Dive
// In this code, we have two different methods to fetch data from a given URL. The first one, getData, uses 
// Promises with .then() and .catch() for error handling. The second one, getDataAsync, uses the async/await syntax, 
// which makes the code more readable and easier to understand, especially for large projects or complex operations. 
// Both methods are equivalent and will produce the same result. The choice between them depends on your preference 
// or specific project requirements.

// Importing the node-fetch module to allow network requests
const fetch = require('node-fetch');

// Function: getData
// This function fetches data from the URL and logs it to the console
// It uses Promise-based syntax
const getData = () => {
   fetch('https://jsonplaceholder.typicode.com/todos/1') // Fetching data from the URL
     .then(response => response.json()) // Parsing the response to JSON
     .then(json => console.log(json)) // Logging the JSON to the console
     .catch(err => console.error(`Error occurred: ${err}`)); // Handling any potential errors
};

// Invoke getData function
getData();

// Function: getDataAsync
// This function is similar to getData, but uses async/await syntax for better readability and error handling
const getDataAsync = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1'); // Fetching data from the URL
        const data = await response.json(); // Parsing the response to JSON
        console.log(data); // Logging the JSON to the console
    } catch (err) {
        console.error(`Error occurred: ${err}`); // Handling any potential errors
    }
};

// Invoke getDataAsync function
getDataAsync();