const {
    buyTruck,
    warehouse,
    launchEmitter
} = require('./functions');

const truckDict = [{
    name: 'First Truck',
    speed: 100,
    capacity: 20
}]
const marketEvent = new(require('events').EventEmitter)();

const emitter_ = () => {
    marketEvent.emit('New Offer', {
        pricePerBox: Math.ceil(Math.random() * 10),
        boxes: Math.floor(Math.random() * 100),
        travel: Math.floor(Math.random() * 1000)
    });
};

const analyzedOffer = offer => {
    if (typeof bank === 'undefined') {
        let bank = 0
    }
    if (typeof truckDict === 'undefined') {
        let truckDict = [{
            name: 'First Truck',
            speed: 100,
            capacity: 20
        }]
    }
    await buyTruck(truckDict, bank);
    let analyzedOffer = {
        pricePerBox: offer.pricePerBox,
        boxes: offer.boxes,
        travel: offer.travel,
        netWorth: offer.boxes * offer.pricePerBox / offer.travel,
        netValue: offer.boxes * offer.pricePerBox,
        truckUsed: Math.ceil(offer.boxes / 20),
    }
    if (analyzedOffer.netValue) {
        warehouse(analyzedOffer, truckDict, bank)
    }
}

// const bank = (modifier, bank) => {
//     bank = bank + modifier;
//     console.log(bank);
//     buyTruck(truckDict, bank);
// }
/* BEGIN - A VIRER */
marketEvent.on('New Offer', offer => {
    analyzedOffer(offer)
});
launchEmitter();
/* END - A VIRER */


module.exports = {
    launchEmitter,
    marketEvent
};