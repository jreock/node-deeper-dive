const fs = require('fs');
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log("timeout 5000 ");} 
        ,5000);
setImmediate(() => {
    console.log("immediate");
});
});
