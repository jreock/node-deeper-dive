const fs = require('fs');

rfCallback = (err,data) => {
    if (err) { 
        console.log(err);
        return;
    }
    console.log(data.toString());
    return;
}

fs.readFile('./textfile',rfCallback);
console.log("Hooray non-blocking!");
