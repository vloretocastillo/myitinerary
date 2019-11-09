
const itineraries = require('express').Router();
const itineraryModel = require('../model/ItineraryModel')

itineraries.get('/all', (req, res) => {
    // itineraryModel.find({})
    //     .then(files => {
    //         res.send(files)
    //     })
    //     .catch(err => console.log(err));
});

itineraries.post('/', (req, res) => {
    
});

module.exports = itineraries;
