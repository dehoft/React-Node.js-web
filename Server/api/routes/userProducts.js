const products = require('express').Router({mergeParams: true});
const productnotes = require('./productNotes');
const mongoose = require('mongoose');
const checkAdminAuth = require('../middleware/check-admin-permissions');
const checkUserAuth = require('../middleware/check-user-permissions');

const jwt = require('jsonwebtoken');

const Product = require('../models/product');

products.get('/',checkUserAuth, (req, res, next) => {
    
    var userId = req.params.userId;   
    if(req.userData.userId === userId)
    {
        Product.find()
        .where('fk_User')
        .equals(userId)
        .exec()
        .then(docs => {
            console.log(docs);
            if(docs.length > 0)
            {
                res.status(200).json(docs);
            }else{
                res.status(404).json({message: 'No information to fetch, Products table is empty',
                username: req.userData.username       
            })
            }
        })
        .catch(err => {
            console.loog(err);
            res.status(500).json({error: err});
        });
    }
    else
    {
        return res.status(401).json({
            message: "Auth failed",
            id: req.userData._id
        })
    }
    
});

products.get('/:productId', checkUserAuth, (req, res, next) => {
    var id = req.params.productId;
    var userId = req.params.userId;
    Product.findById(id)
    .where('fk_User')
    .equals(userId)
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

products.post('/', checkUserAuth, (req, res, next) =>{
    var product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        lenght: req.body.lenght,
        height: req.body.height,
        fk_User: req.params.userId
    });
    product
    .save()
    .then(result => {
        console.log(result),
        res.status(201).json({
            message: 'Product created',
            createdProduct: result
        });

    })
    .catch(err =>{
        console.log(err),
        res.status(500).json({
            error: err
        });

    });    
});

products.patch('/:productId', checkUserAuth, (req, res, next) => {
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
        res.status(200).json({
            message: "Product updated"
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


//If id not found then status = 404
products.delete('/:productId', checkUserAuth, (req, res, next) => {
    var id = req.params.productId;
    var userId = req.params.userId;
    Product.remove({ _id: id, fk_User: userId})
    .exec()
    .then(result => {
        res.status(200).json({
            //result,
            message: 'Product successfully deleted'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
});



products.use('/:productId/productnotes', productnotes);

module.exports = products;

