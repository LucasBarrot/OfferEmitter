const BK = require('./Bank.js');
const buyTruckEvent = new(require('events').EventEmitter)();

// camions dispos
const Trucks = [
    {name:"Truck_1", status:"Free", capacity:20, speed:100},
    {name:"Truck_2", status:"Free", capacity:22, speed:100},
    {name:"Truck_3", status:"Free", capacity:20, speed:100}
];

//fonction listener de l'évenement buyTruckEvent, le listener achete un camion quand l'évent est déclenché
const Buy = async () =>{Trucks.push(
    {name:"Truck_".concat(Trucks.length), status:"Free", capacity:20, speed:100}
    )
};

// événement butruckEvent : la fonction buyTruckEvent.emit() est déclenchée par /Bank.js if( monney >=100)
buyTruckEvent.on('buyNewTruck', Buy);

const gestTruck = async offer => {

    verif = false;
    TrucksAvailable = [];
    load = offer.boxes;
    for (Truck of Trucks){

        console.log(Truck.name + " : " + Truck.status)

        if (Truck.status === "Free"){
            TrucksAvailable.push(Truck)
            verif = true;
            load += - Truck.capacity;
            if (load <= 0){
                // si on a effectué l'offre on appel à l'évent bank_Event et on passe à son listner les argument boxes, priceperboxes
                BK.bank_Event.emit('manage_money', offer.boxes, offer.pricePerBox);
                break;
            }
        }
    }

    console.log(TrucksAvailable)

    if (verif === false) {
        console.log("No truck available")
    }
    else if (load > 0) {
        console.log("Can't take the offer")
    }
    else {
        console.log("Can take the offer")
        for (Truck of TrucksAvailable) {
            Truck.status = await TruckOnTheRoad(Truck, offer)
            //tempTrunckOnTheRoad(Truck, offer)
        }
    }
}

const TruckOnTheRoad = (Truck, offer) =>
{
    Truck.status = "OnTheRoad";
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Free");
        }, offer.travel / Truck.speed * 1000);
    });
};



module.exports = {
    gestTruck,
    buyTruckEvent
};