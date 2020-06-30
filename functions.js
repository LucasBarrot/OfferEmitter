const EV = require('./events.js')
const math = require('mathjs')
const buyTruck = (dataBase) => {
    console.log(dataBase.bank)
    if (dataBase.bank > 1000) {
        dataBase.Trucks.push({
            name: "Truck_".concat(dataBase.Trucks.length),
            status: "Free",
            capacity: 20,
            speed: 100,
            consumption: 6
        })
        dataBase.bank += -1000;
        return dataBase
    }
};

const gestTruck = (offer, dataBase) => {
    trucksAvailable = dataBase.Trucks.filter((truck) => truck.status == "Free");
    trucksAvailableCapacity = math.sum(trucksAvailable.map((truck) => truck.capacity));
    EV.buyTruckEvent.emit('buyNewTruck')
    for (Truck of trucksAvailable) {
        offer.boxes += -Truck.capacity;
        if (offer.boxes <= 0) {
            console.log("Can take the offer")
            dataBase.bank += offer.pay
            trucksAvailable.map((x) => truckOnTheRoad(x, offer));
        }
    }
}

const truckOnTheRoad = async (Truck, offer) => {
    Truck.status = "OnTheRoad"
    let isArrived = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Free")
        }, (offer.travel / Truck.speed) * 2000);
    });
    isArrived.then((value) => {
        Truck.status = value
    })
};
const launchEmitter = (EvolutionRapidityConst, EvolutionRapidity) => {
    EvolutionRapidity += EvolutionRapidityConst
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
}

module.exports = {
    buyTruck,
    launchEmitter,
    emitter_,
    analyzedOffer,
    gestTruck,
    truckOnTheRoad,
};