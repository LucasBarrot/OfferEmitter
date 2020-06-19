const EV = require("./events.js");

const buyTruck = (dataBase) => {
  if (dataBase.bank > 1000) {
    dataBase.Trucks.push({
      name: "Truck_".concat(Trucks.length),
      status: "Free",
      capacity: 20,
      speed: 100,
    });
    dataBase.bank += -1000;
    return dataBase;
  }
};

const gestTruck = (offer, dataBase) => {
  verif = false;
  TrucksAvailable = [];
  load = offer.boxes;
  EV.buyTruckEvent.emit("buyNewTruck");
  for (Truck of dataBase.Trucks) {
    console.log(Truck.name + " : " + Truck.status);
    if (Truck.status == "Free") {
      TrucksAvailable.push(Truck);
      verif = true;
      load += -Truck.capacity;
      if (load <= 0) {
        break;
      }
    }
  }

  console.log(TrucksAvailable);

  if (verif == false) {
    console.log("No truck available");
  } else if (load > 0) {
    console.log("Can't take the offer");
  } else {
    console.log("Can take the offer");
    dataBase.bank += offer.pay;
    TrucksAvailable.map((x) => tempTruckOnTheRoad(x, offer));
  }
};

const tempTruckOnTheRoad = async (Truck, offer) => {
  Truck.status = await truckOnTheRoad(Truck, offer);
};

const truckOnTheRoad = (Truck, offer) => {
  Truck.status = "OnTheRoad";
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Free");
    }, (offer.travel / Truck.speed) * 1000);
  });
};

const launchEmitter = () => {
  emitter_();
  setTimeout(launchEmitter, Math.random() * 10000);
};

const emitter_ = () => {
  EV.marketEvent.emit("New Offer", {
    pricePerBox: Math.ceil(Math.random() * 10),
    boxes: Math.floor(Math.random() * 100),
    travel: Math.floor(Math.random() * 1000),
  });
};

const analyzedOffer = (offer) => {
  Object.defineProperty(offer, "pay", {
    value: offer.pricePerBox * offer.boxes,
  });
  console.log(offer);
  gestTruck(offer);
};

module.exports = {
  buyTruck,
  launchEmitter,
  emitter_,
  analyzedOffer,
  tempTruckOnTheRoad,
  gestTruck,
  truckOnTheRoad,
};
