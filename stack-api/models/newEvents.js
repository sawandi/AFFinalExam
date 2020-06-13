const mongoose = require('mongoose')

//modal for new event
var NewEvent = mongoose.model('event',{
    name : {type:String},
    category : {type:String},
    duration : {type:String},
    price : {type:Number},
    contactDetails : {type:Number},
    description : {type:String},
    image : {type:String},
})

module.exports = { NewEvent }