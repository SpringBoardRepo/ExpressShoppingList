
const express = require('express');
const ExpressError = require('./expressError');
const fakeDb = require('./fakeDb');
const routes = require('./itemRoutes');
const app = express();
app.use(express.json());

app.use('/items', routes)

app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err,
        message: err.message
    })
})

module.exports = app