const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    note: {
        type: String, 
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    },   
    fk_Product: String
});

module.exports = mongoose.model('Note', noteSchema);