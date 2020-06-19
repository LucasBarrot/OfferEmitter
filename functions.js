const buyTruck = async (truckDict, bank) => {
    if (bank >= 3000) {
        truckDict.push({
            name: `Truck${truckDict.length + 2}`,
            speed: 100,
            capacity: 20
        })
        console.log(truckDict.length)
        bank += -3000;
        return truckDict;
    }
}

const warehouse = async (truckDict, analyzedOffer, bank) => {
    console.log(truckDict);
}

const launchEmitter = () => {
    emitter_();
    setTimeout(launchEmitter, Math.random() * 10000);
};

module.exports = {
    buyTruck,
    warehouse
};