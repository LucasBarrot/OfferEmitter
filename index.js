const FT = require('./functions.js');
const EV = require('./events.js');
const dataBase = {
  bank: 2000,
  difficulty: 1,
  Trucks: [
    {
      name: 'Truck_0',
      level: 1,
      status: 'Free',
      capacity: 20,
      speed: 100,
      consumption: 8
    },
    {
      name: 'Truck_1',
      level: 1,
      status: 'Free',
      capacity: 20,
      speed: 100,
      consumption: 8
    }
  ]
};
EV.marketEvent.on('New Offer', (offer) => FT.analyzedOffer(offer, dataBase));
EV.buyTruckEvent.on('purchaseTruck', () => FT.gestPurchase(dataBase));
FT.launchEmitter(dataBase);
