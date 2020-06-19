const TM = require('./Truck_M_test.js');

const marketEvent = new(require('events').EventEmitter)(); //define EventEmitter class

// renvoie les infos
const emitter_ = () => {
    marketEvent.emit('New Offer', {
        pricePerBox: Math.ceil(Math.random() * 10),
        boxes: Math.floor(Math.random() * 100),
        travel: Math.floor(Math.random() * 1000)
    });
};

const launchEmitter = () => {
    emitter_();
    setTimeout(launchEmitter, Math.random() * 10000);
};

const analyzeOffer = offer => {
    console.log(offer);
    TM.gestTruck(offer);
}


marketEvent.on('New Offer', analyzeOffer);

// /* BEGIN - A VIRER */
//marketEvent.on('New Offer', offer => console.log(offer));
launchEmitter();
// /* END - A VIRER */

module.exports = {
    launchEmitter,
    marketEvent
};

