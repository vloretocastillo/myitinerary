const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        // required: true
    },
    profile_picture: {
        type: String,
        // required: true,
    },
    duration: {
        type: Date,
        // required: true,
    },
    price: {
        type: Number,
        // required: true,
    },
    hashtags: {
        type: Array
    },
})

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    itineraries : [itinerarySchema]
})

//name if module is the singular of how the database is called
module.exports = mongoose.model('city', citySchema)