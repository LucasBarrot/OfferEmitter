const marketEvent = new (require('events').EventEmitter)(); // Define EventEmitter class
const buyTruckEvent = new (require('events').EventEmitter)();

module.exports = {
  marketEvent,
  buyTruckEvent
};
