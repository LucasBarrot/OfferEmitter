const EV = require('./events.js');
const math = require('mathjs');
const buyTruck = (dataBase) => {
  if (dataBase.bank > 1000 * dataBase.Trucks.length) {
    dataBase.bank += -(1000 * dataBase.Trucks.length);
    dataBase.Trucks.push({
      name: 'Truck_'.concat(dataBase.Trucks.length.toString()),
      level: 1,
      status: 'Free',
      capacity: 20,
      speed: 100,
      consumption: 8
    });
    console.log(
      'new truck available ' +
        'Truck_'.concat((dataBase.Trucks.length - 1).toString())
    );
    return dataBase;
  }
};

const upgradeTruck = (dataBase, truck) => {
  if (dataBase.bank > 100 * truck.level && truck.status === 'Free') {
    dataBase.bank += -100 * truck.level;
    truck.level += 1;
    truck.capacity += 5;
    truck.speed += 2;
    truck.consumption += 2;
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

const truckToGo = (dataBase, trucksAvailable, offer) => {
  const trucksAvailableToGo = [];
  for (const truck of trucksAvailable) {
    if (offer.boxes > 0) {
      offer.boxes -= truck.capacity;
      trucksAvailableToGo.push(truck);
    } else {
      break;
    }
  }

  trucksAvailableToGo.map((x) => truckOnTheRoad(x, offer, dataBase));
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
    truckToGo(dataBase, trucksAvailable, offer);
  }

  console.log('money : ' + dataBase.bank);
  dataBase.Trucks.map((x) =>
    console.log(x.name + ' (level :' + x.level + '); ' + x.status)
  );
  console.log('');
};

const truckOnTheRoad = async (Truck, offer, dataBase) => {
  Truck.status = 'OnTheRoad';
  const isArrived = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Free');
    }, (offer.travel / Truck.speed) * 2000);
  });
  isArrived.then((value) => {
    dataBase.bank += -Math.ceil(Truck.consumption * offer.travel * 0.01);
    Truck.status = value;
    console.log(
      Truck.name +
        ': Shipping done. Cost :' +
        Math.ceil(Truck.consumption * offer.travel * 0.01)
    );
    return dataBase;
  });
};

const launchEmitter = (dataBase) => {
  emitter_(dataBase);
  setTimeout(function () {
    launchEmitter(dataBase);
  }, Math.random() * 10000);
  dataBase.difficulty += 0.1;
  return dataBase;
};

const emitter_ = (dataBase) => {
  EV.marketEvent.emit('New Offer', {
    pricePerBox: Math.ceil(Math.random() * 10 * dataBase.difficulty),
    boxes: Math.floor(Math.random() * 50 * dataBase.difficulty + 10),
    travel: Math.floor(Math.random() * 1000)
  });
};

const analyzedOffer = (offer, dataBase) => {
  offer.pay = offer.pricePerBox * offer.boxes;
  console.log(
    'New offer :\n' +
      'Boxes :' +
      offer.boxes +
      '\nPrice per box :' +
      offer.pricePerBox +
      '\nTravel :' +
      offer.travel +
      '\n'
  );
  if (
    offer.pay >
    (offer.boxes / dataBase.Trucks[0].capacity) *
      dataBase.Trucks[0].consumption *
      offer.travel *
      0.01
  ) {
    gestTruck(offer, dataBase);
  } else {
    console.log('offer not worth, abort mission');
  }
};

module.exports = {
  launchEmitter,
  emitter_,
  analyzedOffer,
  gestTruck,
  truckOnTheRoad,
  gestPurchase
};
