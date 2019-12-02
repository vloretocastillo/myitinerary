const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true
    },




    avatar : {
        type: String,
    },

    favorites : {
        type: [String]
    }
})

module.exports = mongoose.model('user', userSchema)