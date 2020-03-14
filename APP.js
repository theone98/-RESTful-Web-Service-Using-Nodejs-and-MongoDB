const express = require('express');
const app = express();
const morgan = require('morgan');
const monk = require('monk');
const bodyParser = require("body-parser");
const pRoutes = require('./person');

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Routes which should handle requests
app.use('/person', pRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;