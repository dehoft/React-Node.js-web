const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    role: {
        type: ['USER', 'ADMIN'],
        default: 'USER'
    }

});

module.exports = mongoose.model('User', userSchema);