const products = require('express').Router();
const mongoose = require('mongoose');


const Product = require('../models/product');

products.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        if(docs.length > 0)
        {
            res.status(200).json(docs);
        }else{
            res.status(404).json({message: 'No information to fetch, Products table is empty'})
        }
    })
    .catch(err => {
        console.loog(err);
        res.status(500).json({error: err});
    });
});

products.get('/:productId', (req, res, next) => {
        var id = req.params.productId;
        Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc)
            {
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid Product found for provided ID'});
            }
            
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err});
        });
});

module.exports = products;