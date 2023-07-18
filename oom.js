// NodeJS Deeper Dive
// This Node.js script is designed to simulate a memory leak scenario. It continually allocates chunks of memory 
// (10MB at a time in this case) at regular intervals (40 milliseconds in this case). These allocations are stored in an 
// array, memoryLeakAllocations, effectively preventing the allocated memory from being garbage collected and thus simulating 
// a memory leak. At each interval, it also fetches and logs the current memory usage of the application.

// Create an array to hold allocations, simulating a situation where memory is not freed
const memoryLeakAllocations = [];

// Specify the field we're interested in from the process.memoryUsage() output
const field = "heapUsed";
// Set the size of each allocation step in bytes (10MB here)
const allocationStep = 10000 * 1024; 

// Specify the interval at which we allocate memory and report usage
const TIME_INTERVAL_IN_MSEC = 40;

// Start an interval to continuously allocate memory and report usage
setInterval(() => {
  // Allocate memory and push the allocation to our array
  const allocation = allocateMemory(allocationStep);
  memoryLeakAllocations.push(allocation);

  // Get the current memory usage
  const mu = process.memoryUsage();
  // Convert the heap used from bytes to GB
  const gbNow = mu[field] / 1024 / 1024 / 1024;
  // Round to two decimal places for display
  const gbRounded = Math.round(gbNow * 100) / 100;

  // Log the currently allocated heap memory
  console.log(`Heap allocated ${gbRounded} GB`);
}, TIME_INTERVAL_IN_MSEC);

// This function simulates the allocation of memory
function allocateMemory(size) {
    const numbers = size / 8; // Calculate number of 8-byte numbers we can fit
    const arr = []; // Create a new array
    arr.length = numbers; // Pre-allocate the array size
    for (let i = 0; i < numbers; i++) {
      arr[i] = i; // Fill the array with numbers
    }
    return arr; // Return the array, which simulates memory allocation
  }
