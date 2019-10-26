const notes = require('express').Router({mergeParams: true});
const mongoose = require('mongoose');
const checkAdminAuth = require('../middleware/check-admin-permissions');

const Note = require('../models/note');
const Product = require('../models/product');

// Route for ADMIN to get all notes of selected product
notes.get('/', checkAdminAuth, (req, res, next) => {
    var productId = req.params.productId;
    Product.fintById(productId)
    .exec()
    .then(result => {
        if(result)
        {
            Note.find()
            .where('fk_Product')
            .equals(productId)
            .exec()
            .then(docs => {
                console.log(docs);
                if(docs.length > 0)
                {
                    res.status(200).json(docs);
                }else{
                    res.status(404).json({message: 'No information to fetch, product doesn\'t have any notes'})
                }
            })
            .catch(err => {
                console.loog(err);
                res.status(500).json({error: err});
            });
        }else{
            res.status(404).json({
                message: "Product doesn\'t exist"
            })
        }
    })
    .catch(err => {
        console.loog(err);
        res.status(500).json({error: err});
    });    
});


// Route for ADMIN to get selected note of selected product
notes.get('/:noteId', checkAdminAuth, (req, res, next) => {
    var id = req.params.noteId;
    var productId = req.params.productId;
    Product.findById(productId)
    .exec()
    .then(result => {
        if(result)
        {
            Note.findById(id)
            .where('fk_Product')
            .equals(productId)
                .exec()
                .then(doc => {
                    console.log(doc);
                    if(doc)
                    {
                        res.status(200).json(doc);
                    } else{
                        res.status(404).json({message: 'No valid Note found for provided ID'});
                    }
                    
                })
                .catch(err => {
                    console.log(err),
                    res.status(500).json({error: err});
                });
        }
        else{
            res.status(404).json({
                message: "Product doesn\'t exist"
            })
        }
    })
    .catch(err => {
        console.loog(err);
        res.status(500).json({error: err});
    });   
});


notes.post('/', checkAdminAuth, (req, res, next) =>{
    var note = new Note({
        _id: new mongoose.Types.ObjectId(),
        note: req.body.note,
        fk_Product: req.params.productId
    });
    note
    .save()
    .then(result => {
        console.log(result),
        res.status(201).json({
            message: 'POST to /notes succesful!',
            createdNote: result
        });

    })
    .catch(err =>{
        console.log(err),
        res.status(500).json({
            error: err
        });

    });    
});

module.exports = notes;