const products = require('express').Router();
const mongoose = require('mongoose');
const checkAdminAuth = require('../middleware/check-admin-permissions');
const notes = require('./notes');


const Product = require('../models/product');
const Note = require('../models/note');

products.get('/', checkAdminAuth,(req, res, next) => {
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

products.get('/:productId', checkAdminAuth, (req, res, next) => {
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

products.patch('/:productId',checkAdminAuth, (req, res, next) => {
    var id = req.params.productId;
    var userId = req.params.userId;
    var updateOps = {};
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id , fk_User: userId}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(result);
    });
});


//If id not found then status = 404
products.delete('/:productId',checkAdminAuth, (req, res, next) => {
    var id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(result => {
        if(result)
        {
            Note.remove({fk_Product: id})
            .exec()
            .then()
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                });
            });

            Product.remove({ _id: id})
            .exec()
            .then(result => {
                res.status(200).json({            
                    message: 'Product successfully deleted'
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                });
            });
        }
        else{
            res.status(404).json({            
                message: 'Product with such ID doesn\'t exist'
            })
        }
    })
    .catch()
});

products.use('/:productId/notes', notes);

module.exports = products;