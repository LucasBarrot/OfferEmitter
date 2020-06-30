const marketEvent = new (require("events").EventEmitter)(); //define EventEmitter class
const buyTruckEvent = new (require("events").EventEmitter)();

module.exports = {
  marketEvent,
  buyTruckEvent,
};
