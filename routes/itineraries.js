
const itineraries = require('express').Router();
const itineraryModel = require('../model/ItineraryModel')

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

const updateOneItinerary = (req, res) => {
    itineraryModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
    }, {new: true})
    .then(file => {
        file.save()
        if(!file) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send(file);
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
    
}

const deleteOneItinerary = (req, res) => {
    itineraryModel.findByIdAndRemove(req.params.id)
    .then(file => {
        if(!file) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
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

itineraries.get('/', (req,res) => retrieveAllItinerariesByCityName(req,res));

itineraries.get('/all', (req,res) => retrieveAllItineraries(req,res));

itineraries.get('/all/:cityId', (req,res) => retrieveAllItinerariesByCity(req,res));

itineraries.post('/', (req, res) => createOneItinerary(req,res));

itineraries.get('/:id', (req, res) => retrieveOneItinerary(req, res));

itineraries.put('/:id', (req, res) => updateOneItinerary(req, res));

itineraries.delete('/:id', (req, res) => deleteOneItinerary(req, res));

module.exports = itineraries;
