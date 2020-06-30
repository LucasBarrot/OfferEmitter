const EV = require("./events.js");

const buyTruck = (dataBase) => {
  console.log(dataBase.bank);
  if (dataBase.bank > 1000) {
    dataBase.Trucks.push({
      name: "Truck_".concat(dataBase.Trucks.length),
      level: 1,
      status: "Free",
      capacity: 20,
      speed: 100,
    });
    dataBase.bank += -1000;
    return dataBase;
  }
};

const upgradeTruck = (dataBase, truck) => {
  console.log(dataBase.bank);
  if (dataBase.bank > 100 * truck.level) {
    truck.level += 1;
    truck.capacity += 10;
    truck.speed += 10;
    dataBase.bank += -1000;
  }
  return dataBase;
};

const gestPurchase = (dataBase) => {
  trucksToUpgrade = dataBase.Trucks.filter(
    (truck) => truck.level == dataBase.Trucks.length
  );
  if (trucksToUpgrade.length == 0) {
    buyTruck(dataBase);
  } else {
    trucksToUpgrade.map((truck) => upgradeTruck(dataBase, truck));
  }
};

const gestTruck = (offer, dataBase) => {
  trucksAvailable = dataBase.Trucks.filter((truck) => truck.status == "Free");
  trucksAvailableCapacity = math.sum(
    trucksAvailable.map((truck) => truck.capacity)
  );
  EV.buyTruckEvent.emit("buyNewTruck");
  if (offer.boxes > trucksAvailableCapacity) {
    console.log("Can't take the offer");
  } else {
    console.log("Can take the offer");
    dataBase.bank += offer.pay;
    trucksAvailable.map((x) => truckOnTheRoad(x, offer));
  }
};

const truckOnTheRoad = async (Truck, offer) => {
  Truck.status = "OnTheRoad";
  let isArrived = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Free");
    }, (offer.travel / Truck.speed) * 2000);
  });
  isArrived.then((value) => {
    Truck.status = value;
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

const analyzedOffer = (offer, dataBase) => {
  offer.pay = offer.pricePerBox * offer.boxes;
  console.log(offer);
  gestTruck(offer, dataBase);
};

module.exports = {
  launchEmitter,
  emitter_,
  analyzedOffer,
  gestTruck,
  truckOnTheRoad,
  gestPurchase,
};
