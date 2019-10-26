const notes = require('express').Router({mergeParams: true});
const mongoose = require('mongoose');
const checkAdminAuth = require('../middleware/check-admin-permissions');
const checkUserAuth = require('../middleware/check-user-permissions');


const Note = require('../models/note');

notes.get('/', checkUserAuth, (req, res, next) => {
    var productId = req.params.productId;
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
            res.status(404).json({message: 'No information to fetch, Note table is empty'})
        }
    })
    .catch(err => {
        console.loog(err);
        res.status(500).json({error: err});
    });
});

notes.get('/:noteId', checkUserAuth, (req, res, next) => {
    var id = req.params.noteId;
    var productId = req.params.productId;
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
});

notes.post('/', checkUserAuth, (req, res, next) =>{
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

notes.patch('/:noteId', checkUserAuth, (req, res, next) => {
    var id = req.params.noteId;
    var productId = req.params.productId;
    var updateOps = {};
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }
    Note.update({ _id: id , fk_Product: productId}, {$set: updateOps})
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
notes.delete('/:noteId', checkUserAuth, (req, res, next) => {
    var id = req.params.noteId;
    var productId = req.params.productId;
    Note.remove({ _id: id, fk_Product: productId})
    .exec()
    .then(result => {
        res.status(200).json({
            //result,
            message: 'Note successfully deleted'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
});

module.exports = notes;