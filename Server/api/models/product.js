const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    lenght: {
        type: Number, 
        required: true
    },
    height: {
        type: Number, 
        required: true
    },
    fk_User: String
});

module.exports = mongoose.model('Product', productSchema);