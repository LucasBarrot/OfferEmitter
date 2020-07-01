const EV = require('./events.js');
const math = require('mathjs');

const buyTruck = (dataBase) => {
  if (dataBase.bank > 1000 * dataBase.Trucks.length) {
    dataBase.bank += -1000 * dataBase.Trucks.length;
    dataBase.Trucks.push({
      name: 'Truck_'.concat(str(dataBase.Trucks.length)),
      level: 1,
      status: 'Free',
      capacity: 20,
      speed: 80
    });

    console.log(
      'new truck available ' + 'Truck_'.concat(dataBase.Trucks.length - 1)
    );
    return dataBase;
  }
};

const upgradeTruck = (dataBase, truck) => {
  if (
    dataBase.bank > 200 * truck.level * dataBase.Trucks.length &&
    truck.status === 'Free'
  ) {
    dataBase.bank += -200 * truck.level * dataBase.Trucks.length;
    truck.level += 1;
    truck.capacity += 10;
    truck.speed += 2;
    console.log(truck.name + ' is upgraded');
  }

  return dataBase;
};

const gestPurchase = (dataBase) => {
  const trucksToUpgrade = dataBase.Trucks.filter(
    (truck) => truck.level !== dataBase.Trucks.length
  );
  if (trucksToUpgrade.length === 0) {
    buyTruck(dataBase);
  } else {
    trucksToUpgrade.map((truck) => upgradeTruck(dataBase, truck));
  }
};

const TruckToGo = (trucksAvailable, offer) => {
  load = offer.boxes;
  const trucksAvailableToGo = [];
  for (truck of trucksAvailable) {
    if (load > 0) {
      load -= truck.capacity;
      trucksAvailableToGo.push(truck);
    } else {
      break;
    }
  }
  trucksAvailableToGo.map((x) => truckOnTheRoad(x, offer));
};

const gestTruck = (offer, dataBase) => {
  const trucksAvailable = dataBase.Trucks.filter(
    (truck) => truck.status === 'Free'
  );
  const trucksAvailableCapacity = math.sum(
    trucksAvailable.map((truck) => truck.capacity)
  );
  EV.buyTruckEvent.emit('purchaseTruck');
  if (offer.boxes > trucksAvailableCapacity) {
    console.log("Can't take the offer");
  } else {
    console.log('Can take the offer');
    dataBase.bank += offer.pay;
    TruckToGo(trucksAvailable, offer);
  }
  console.log('money : ' + dataBase.bank);
  dataBase.Trucks.map((x) =>
    console.log(
      x.name +
        ' (level : ' +
        x.level +
        ', speed : ' +
        x.speed +
        ', capacity: ' +
        x.capacity +
        '): ' +
        x.status
    )
  );
  console.log('');
};

const truckOnTheRoad = async (Truck, offer) => {
  Truck.status = 'OnTheRoad';
  let isArrived = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Free');
    }, (offer.travel / Truck.speed) * 2000);
  });
  isArrived.then((value) => {
    Truck.status = value;
  });
};

const launchEmitter = (EvolutionRapidityConst, EvolutionRapidity) => {
  EvolutionRapidity += EvolutionRapidityConst;
  emitter_(EvolutionRapidity);
  setTimeout(function () {
    launchEmitter(EvolutionRapidityConst, EvolutionRapidity);
  }, Math.random() * 10000);
};

const emitter_ = (evolutionRapidity) => {
  EV.marketEvent.emit('New Offer', {
    pricePerBox: Math.ceil(Math.random() * 10 * 0.1 * evolutionRapidity),
    boxes: Math.floor(Math.random() * 100 * 0.1 * evolutionRapidity),
    travel: Math.floor(Math.random() * 1000)
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
  gestPurchase
};
