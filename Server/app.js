const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const usersRoutes = require('./api/routes/users');
const notesRoutes = require('./api/routes/notes');

mongoose.connect('mongodb+srv://'+ 
    process.env.MONGO_ATLAS_USERNAME + ':' + 
    process.env.MONGO_ATLAS_PW + 
    '@saitynai-ogs0y.mongodb.net/saitynai?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acess-Controll-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS'){
        res.header('Acess-Controll-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/users', usersRoutes);
app.use('/notes', notesRoutes);

app.use("/token", (req, res, next) =>
{
    res.json({
        message: "Hello"
    });

});

app.use((req, res, next) => {
    const error = new Error('Bad request');
    error.status = 400;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;