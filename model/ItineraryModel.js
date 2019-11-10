const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    // title: {
    //     type: String,
    //     required: true,
    // },
    // rating: {
    //     type: Number,
    //     required: true
    // },
    // profile_picture: {
    //     type: URL,
    //     required: true,
    // },
    // duration: {
    //     required: true,
    // },
    // price: {
    //     type: Number,
    //     required: true,
    // },
    // hashtags: {
    //     type: Array
    // },
    // cityId: {
        // type: ObjectId
    // }
})

//name if module is the singular of how the database is called
module.exports = mongoose.model('itinerary', itinerarySchema)