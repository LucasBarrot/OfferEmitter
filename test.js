const marketEvent = new(require('events').EventEmitter)();

const Trucks = [
    {name:"Truck_1", status:"Free", capacity:20, speed:100},
    {name:"Truck_2", status:"Free", capacity:20, speed:100},
    {name:"Truck_3", status:"Free", capacity:20, speed:100}
];

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
    console.log(offer.boxes, offer.pricePerBox, offer.travel);
    gestTruck(offer)
}

const gestTruck = async offer => {
    verif = false;
    TrucksAvailable = [];
    load = offer.boxes;
    for (Truck of Trucks)
    {
        console.log(Truck.name + " : " + Truck.status)
        if (Truck.status == "Free")
        {
            TrucksAvailable.push(Truck)
            verif = true;
            load += - Truck.capacity;
            if (load <= 0)
            {
                break;
            }
        }
    }

    console.log(TrucksAvailable)

    if (verif == false)
    {
        console.log("No truck available")
    }
    else if (load > 0)
    {
        console.log("Can't take the offer")
    }
    else
    {
        console.log("Can take the offer")
        for (Truck of TrucksAvailable)
        {
            tempTrunckOnTheRoad(Truck, offer)
        }
    }
}

const tempTrunckOnTheRoad = async (Truck, offer) => {
    Truck.status = await TruckOnTheRoad(Truck, offer);
}

const TruckOnTheRoad = (Truck, offer) =>
{
    Truck.status = "OnTheRoad"
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Free");
        }, offer.travel / Truck.speed * 1000);
    });
};

marketEvent.on('New Offer', analyzeOffer);

// /* BEGIN - A VIRER */
//marketEvent.on('New Offer', offer => console.log(offer));
launchEmitter();
// /* END - A VIRER */

module.exports = {
    launchEmitter,
    marketEvent
};