const FT = require("./functions.js");
const EV = require("./events.js");
const dataBase = {
  bank: 0,
  Trucks: [
    {
      name: "Truck_1",
      status: "Free",
      capacity: 20,
      speed: 100,
    },
  ],
};

EV.marketEvent.on("New Offer", (offer) => FT.analyzedOffer(offer));
EV.buyTruckEvent.on("buyNewTruck", FT.buyTruck(dataBase));
FT.launchEmitter();
