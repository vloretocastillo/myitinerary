
const itineraries = require('express').Router();
const itineraryModel = require('../model/ItineraryModel')
const passport = require("passport");


const retrieveAllItineraries = (req, res) => {
    itineraryModel.find({})
    .then(files => {
        res.send(files)
    })
    .catch(err => console.log(err));
}

const retrieveAllItinerariesByCity = (req, res) => {
    itineraryModel.find({parentCityId : req.params.cityId })
    .then(files => {
        res.send(files)
    })
    .catch(err => console.log(err));
}

const createOneItinerary = (req,res) => {
    const newItinerary = new itineraryModel({
        title: req.body.title,
        parentCityId: req.body.parentCityId, 
    })
    newItinerary.save()
        .then(itinerary => { res.send(itinerary) })
        .catch(err => { res.status(500).send("Server error")}) 
}


const retrieveOneItinerary = (req, res) => {
    itineraryModel.find({_id : req.params.id})  
        .then((file) => {
            res.send(file);  
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Resource not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        });
}




const retrieveAllItinerariesByCityName = (req, res) => {
    itineraryModel.find({parentCityName : req.query.city })
    .then(files => {
        res.send(files)
    })
    .catch(err => console.log(err));
}

itineraries.get('/favorites', passport.authenticate('jwt', {session : false}), (req, res) => {
    console.log('req.headers.favorites', req.headers.favorites)
    const ids = req.headers.favorites.split(',')
    // console.log('ids', ids)
    itineraryModel.find( { _id : { $in : ids } } )
        .then(data => res.send(data))
        .catch(err => console.log(err));
    // res.send('protected')
});

itineraries.get('/', (req,res) => retrieveAllItinerariesByCityName(req,res));
itineraries.get('/all/:cityId', (req,res) => retrieveAllItinerariesByCity(req,res));
itineraries.get('/all', (req,res) => retrieveAllItineraries(req,res)); //!
itineraries.post('/', (req, res) => createOneItinerary(req,res)); //!
itineraries.get('/:id', (req, res) => retrieveOneItinerary(req, res));

// itineraries.put('/:id', (req, res) => updateOneItinerary(req, res));
// itineraries.delete('/:id', (req, res) => deleteOneItinerary(req, res));





module.exports = itineraries;
