const {heapdump} = require('heapdump');

var unsafeData = [];
var safeData = [];

class randNumber {
   constructor(data){
     this.data = data;
   }
}

function clean(arr, obj) {
   var i = arr.indexOf(obj);
   arr.splice(i, 1);
}

function store() {
   var randNum = Math.random().toString();
   var obj = new randNumber(randNum);

   unsafeData.push(obj);
   safeData.push(obj);

   // Only clean the "safe" array
   clean(safeData, obj);

}

function getHeap() {

   var heap = process.memoryUsage().heapUsed;
   console.log("Using " + heap + " bytes of heap.");
   require('v8').writeHeapSnapshot();

}

setInterval(store, 1);
setInterval(getHeap, 2000);