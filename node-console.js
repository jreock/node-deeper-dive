const fs = require('fs');

const out = fs.createWriteStream('./app.log');
const err = fs.createWriteStream('./error.log');;
const myConsole = new console.Console(out, err);

myConsole.log('hello world');
myConsole.error(new Error('bad error!!'));
myConsole.warn('oooooh a warning!');


