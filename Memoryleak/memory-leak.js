// NodeJS Deeper Dive
// This Node.js script is meant to demonstrate a memory leak. It creates objects of a custom class 'randNumber' and 
// stores them in two arrays, 'unsafeData' and 'safeData'. However, while objects are removed from 'safeData' right 
// after being added, they remain in 'unsafeData', thus causing the memory used by the application to continually 
// increase over time. This is tracked by periodically logging the current heap usage and creating heap snapshots 
// using the V8 engine's heap profiling functionality.

// First, we import the 'heapdump' module, which provides a function to create a snapshot of the V8 heap.
const {heapdump} = require('heapdump');

// We define two arrays: 'unsafeData' and 'safeData'.
var unsafeData = [];
var safeData = [];

// We define a class 'randNumber' that takes a parameter 'data' and sets it as a property.
class randNumber {
   constructor(data){
     this.data = data;
   }
}

// We define a function 'clean' that removes a given object from a given array.
function clean(arr, obj) {
   var i = arr.indexOf(obj);
   arr.splice(i, 1);
}

// We define a function 'store' that creates a new 'randNumber' object with a random number as data,
// adds this object to both 'unsafeData' and 'safeData', and removes the object from 'safeData'.
function store() {
   var randNum = Math.random().toString();
   var obj = new randNumber(randNum);

   unsafeData.push(obj);
   safeData.push(obj);

   // Only clean the "safe" array
   clean(safeData, obj);
}

// We define a function 'getHeap' that prints the current heap usage and creates a heap snapshot.
function getHeap() {
   var heap = process.memoryUsage().heapUsed;
   console.log("Using " + heap + " bytes of heap.");
   require('v8').writeHeapSnapshot();
}

// We start two intervals: one that calls 'store' every 1 millisecond, and one that calls 'getHeap' every 2 seconds.
setInterval(store, 1);
setInterval(getHeap, 2000);
