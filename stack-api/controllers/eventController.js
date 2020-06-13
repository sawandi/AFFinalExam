const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId
var multer = require('multer')
var uniqid = require('uniqid')

var { NewEvent } = require('../models/newEvents')

/*******APIs for manage event planning*********/

//API for get event details
router.get('/',(req,res)=>{
    NewEvent.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving all records : '+JSON.stringify(err,undefined,2))
        }
    })
})

//API for create new event
router.post('/',(req,res)=>{
    var newRecord = new NewEvent({
        name : req.body.name,
        category : req.body.category,
        duration : req.body.duration,
        price : req.body.price,
        contactDetails : req.body.contactDetails,
        description : req.body.description,
        image : req.body.image
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while register : '+JSON.stringify(err,undefined,2))
        }
    })
})

//API for update event handeling details by relevant id
router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    var updateRecords={
        name : req.body.name,
        category : req.body.category,
        duration : req.body.duration,
        price : req.body.price,
        contactDetails : req.body.contactDetails,
        description : req.body.description,
        image : req.body.image
    }

    NewEvent.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

//API for delete event details
router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    NewEvent.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, uniqid() + '-' +file.originalname )
  }
})

//for upload image
var upload = multer({ storage: storage }).single('file')

router.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

})

module.exports = router