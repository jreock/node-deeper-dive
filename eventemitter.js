const events = require('events');
var eventEmitter = new events.EventEmitter();
const ringPhone = () => {
    console.log('brrrrrr-ring, brrrr-ing, brrrrring…' );
}
const emergencyRing = () => {
    console.log('Hey the world is on fire!!');
}

eventEmitter.on('incomingCall', ringPhone); 
eventEmitter.on('emergency',emergencyRing);
eventEmitter.emit('incomingCall');
eventEmitter.emit('emergency');
eventEmitter.emit('somethingelse');

