const FT = require('./functions.js');
const EV = require('./events.js')
const dataBase = {
    "bank": 2000,
    Trucks: [{
        name: "Truck_0",
        status: "Free",
        capacity: 20,
        speed: 100,
        consumption: 5
    }]
}

EV.marketEvent.on('New Offer', (offer) => FT.analyzedOffer(offer, dataBase));
EV.buyTruckEvent.on('buyNewTruck', () => FT.buyTruck(dataBase));
FT.launchEmitter();