const mongoose = require('mongoose')

//modal for ordered item
var myEvent = mongoose.model('myEvent',{
    type: {type:String},
    email: {type:String},
    eventId: {type:String},
    eventName: {type:String},
    eventCategory: {type:String},
    eventDuration: {type:String},
    eventPrice: {type:Number},
    eventDescription: {type:String},
    //eventDiscount: {type:Number},
    total : {type:Number},
    eventImage : {type:String},
    payment: {type:String}
})

module.exports = { myEvent }