const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    
})

//name if module is the singular of how the database is called
module.exports = mongoose.model('itinerary', itinerarySchema)