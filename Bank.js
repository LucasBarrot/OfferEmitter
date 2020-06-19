const TM = require('./Truck_M_test.js');
const bank_Event = new(require('events').EventEmitter)(); //define EventEmitter class

const founds = 0;
const display_founds = (gains) => {return founds+gains;}

//contrôle les fonds : vérifie son on a assez d'argent pour acheter un camion.

const  Money_manager = async (boxes, priceperboxes) => {
    //si on a assez d'argent on appel buyTruckEvent
    if (display_founds(boxes*priceperboxes) >= 100){
        TM.buyTruckEvent.emit('buyNewTruck');
    }
};

bank_Event.on('manage_money', Money_manager);


module.exports = {
    bank_Event
};