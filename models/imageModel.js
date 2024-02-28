const mongoose = require('mongoose');

const Schema = mongoose.Schema

const imageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    photo: String
})


module.exports = mongoose.model('Image', imageSchema)
