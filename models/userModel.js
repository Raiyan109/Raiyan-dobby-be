const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User Name is Required']
    },
    email: {
        type: String,
        required: [true, 'User Email is Required']
    },
    password: {
        type: String,
        required: [true, 'User Password is Required']
    }
})


module.exports = mongoose.model('User', userSchema)
