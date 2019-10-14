const notes = require('express').Router();
const mongoose = require('mongoose');

const Note = require('../models/note');


notes.get('/', (req, res, next) => {
    Note.find()
    .exec()
    .then(docs => {
        console.log(docs);
        if(docs.length > 0)
        {
            res.status(200).json(docs);
        }else{
            res.status(404).json({message: 'No information to fetch, Notes table is empty'})
        }
    })
    .catch(err => {
        console.loog(err);
        res.status(500).json({error: err});
    });
});

notes.get('/:noteId', (req, res, next) => {
        var id = req.params.noteId;
        Note.findById(id)
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

module.exports = notes;