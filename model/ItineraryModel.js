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
    // duration: {
    //     type: Date,
    //     required: true,
    // },
    // price: {
    //     type: Number,
    //     required: true,
    // },
    // hashtags: {
    //     type: Array
    // },
    parentCityId: {
        type: String,
        required: true,
    },
    parentCityName : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('itinerary', itinerarySchema)