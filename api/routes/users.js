const users = require('express').Router();
const userProducts = require('./userProducts');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const checkAdminAuth = require('../middleware/check-admin-permissions');
const checkUserAuth = require('../middleware/check-user-permissions');


const User = require('../models/user');
const Product = require('../models/product');
const Note = require('../models/note');




users.get('/',checkAdminAuth, (req, res, next) => {
    User.find()
    .select('_id username password adress city phoneNumber role')
    .exec()
    .then(docs => {
        const response = {
            usersCount: docs.length,
            users: docs.map(doc => {
                return {
                    _id: doc._id,
                    username: doc.username,
                    password: doc.password,
                    adress: doc.adress,
                    city: doc.city,
                    role: doc.role,
                    getRequest: {
                        type: 'GET',
                        url: 'http://localhost:3000/users/' + doc._id
                    }
                }
            })
        }
        if(docs.length > 0)
        {
            res.status(200).json(response);
        }else{
            res.status(404).json({message: 'No information to fetch, User table is empty'})
        }
    })
    .catch(err => {
        console.loog(err);
        res.status(500).json({error: err});
    });
});


users.get('/:userId', checkUserAuth, (req, res, next) => {
        var id = req.params.userId;
        User.findById(id)
        .select('_id username password adress city phoneNumber role')
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc)
            {
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid User found for provided ID'});
            }
            
        })
        .catch(err => {
            //console.log(err),
            res.status(400).json({Message: "Bad request"});
        });
});


users.post('/signup', (req, res, next) => {
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: 'Username with the same name exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });                
                } else {
                    var user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: hash,
                        adress: req.body.adress,
                        city: req.body.city,
                        phoneNumber: req.body.phoneNumber
                    });
                }
                    
                user
                .save()
                .then(result => {            
                    res.status(201).json({
                        message: 'User Created',
                        createdUser: {
                            _id: result._id,
                            username: result.username,
                            password: result.password,
                            adress: result.adress,
                            city: result.city,
                            phoneNumber: result.phoneNumber
                        }
                    });
        
                })
                .catch(err =>{
                    res.status(500).json({
                        error: err
                    });
        
                });    
            });
        }
    })

});


users.post('/login', (req, res, next) => {
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: "Username password combination is wrong"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err){
                return res.status(401).json({
                    message: "Username password combination is wrong"
                });
            }
            if (result){
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                    role: user[0].role
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });      
                
                return res.status(200).json({
                    message: 'Login successful',
                    token: token
                });
            }
            res.status(401).json({
                message: "Username password combination is wrong"
            });
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
});


//If id not found then status = 404
users.patch('/:userId', checkUserAuth, (req, res, next) => {
    var id = req.params.userId;
    var updateOps = {};
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User info successfuly updated',
            request: {
                type: 'GET',
                url: 'http://localhost/3000/users/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(result);
    });
});

users.patch('/:userId/promote', checkAdminAuth, (req, res, next) => {
    var id = req.params.userId;
    User.update({ _id: id }, {role: "ADMIN"})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User succesfully promoted',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/users/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(result);
    });
});

users.patch('/:userId/demote', checkAdminAuth, (req, res, next) => {
    var id = req.params.userId;
    User.update({ _id: id }, {role: "USER"})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User succesfully demoted',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/users/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(result);
    });
});




users.delete('/:userId', checkUserAuth, (req, res, next) => {
    var id = req.params.userId;
    User.findById(id)
    .exec()
    .then(docs => {
        if(docs)
        {
            Product.find({fk_User: id}).exec().then(docs => {                
                docs.forEach(product => {                    
                    Note.deleteMany({fk_Product: product._id}).exec().then(result => {
                        res.status(500).json({
                            message: working
                        })
                    }).catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
                });
            }).catch(err => {
                res.status(500).json({
                    error: err
                })
            })

            Product.deleteMany({fk_User: id}).exec().then().catch(err => {
                res.status(500).json({
                    error: err
                })
            })

            User.deleteOne({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'User deleted'
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })

        }else{
            res.status(404).json({
                message: 'User not found'
            })
        }
    })
    .catch()

})

users.use('/:userId/userProducts', userProducts);

module.exports = users;