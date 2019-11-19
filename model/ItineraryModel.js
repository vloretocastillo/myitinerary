const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    // rating: {
    //     type: Number,
    //     required: true
    // },
    // profile_picture: {
    //     type: String,
    //     required: true,
    // },
    duration: {
        type: Number,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    hashtags: {
        type: [String]
    },
    parentCityId: {
        type: String,
        required: true,
    },
    parentCityName : {
        type: String,
        required: true
    },
    activities: {
        type: [String]
    }
})

module.exports = mongoose.model('itinerary', itinerarySchema)