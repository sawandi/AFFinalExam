const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId


var { myEvent } = require('../models/myEvent')


router.get('/',(req,res)=>{
    myEvent.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving all records : '+JSON.stringify(err,undefined,2))
        }
    })
})
/* Create event Details */
router.post('/',(req,res)=>{
    var newRecord= new myEvent({
        type: req.body.type,
        email: req.body.email,
        eventId: req.body.eventId,
        eventName: req.body.eventName,
        eventCategory: req.body.eventCategory,
        eventDuration: req.body.eventDuration,
        eventDescription: req.body.eventDescription,
        eventPrice: req.body.eventPrice,
        total : req.body.total,
        eventImage : req.body.eventImage
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while creating new records : '+JSON.stringify(err,undefined,2))
        }
    })
})

 module.exports = router