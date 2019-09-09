const fetch = require('node-fetch');

const getData = () => {
   fetch('https://jsonplaceholder.typicode.com/todos/1')
     .then(response => response.json())
     .then(json => console.log(json));
};

getData();

const getDataAsync = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json(); 
    console.log(data);
 };
 
 getDataAsync();
