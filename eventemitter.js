//NodeJS Deeper Dive
// This Node.js code utilizes the 'events' module to create an event-driven application. It establishes an event emitter 
// and associates two distinct events, 'incomingCall' and 'emergency', with their respective callback functions, ringPhone 
// and emergencyRing. When these events are emitted using eventEmitter.emit(), the respective callbacks are invoked, triggering 
// a console log action. Additionally, it tries to emit an event called 'somethingelse' which isn't associated with any 
// function, thus it does not lead to any action.

// Import the 'events' module from Node.js, which provides us with the EventEmitter class
const events = require('events');

// Instantiate an object 'eventEmitter' from the EventEmitter class
var eventEmitter = new events.EventEmitter();

// Define the 'ringPhone' function, which simulates the sound of an incoming call
const ringPhone = () => {
    console.log('brrrrrr-ring, brrrr-ing, brrrrring…' );
}

// Define the 'emergencyRing' function, which simulates an emergency alert
const emergencyRing = () => {
    console.log('Hey the world is on fire!!');
}

// Register 'ringPhone' as a listener for the 'incomingCall' event using the .on method
eventEmitter.on('incomingCall', ringPhone);

// Register 'emergencyRing' as a listener for the 'emergency' event
eventEmitter.on('emergency', emergencyRing);

// Emit the 'incomingCall' and 'emergency' events, triggering the associated listeners
eventEmitter.emit('incomingCall');
eventEmitter.emit('emergency');

// Emit an event that doesn't have any listeners registered
eventEmitter.emit('somethingelse');
