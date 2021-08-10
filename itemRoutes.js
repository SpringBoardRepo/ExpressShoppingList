const ExpressError = require('./expressError')
const express = require('express')
const router = new express.Router();

const ITEMS = require('./fakeDb')


router.get('/', function (req, res) {
    res.json({ item: ITEMS })
})

router.get('/:name', function (req, res) {
    const item = ITEMS.find(i => i.name === req.params.name)
    if (item === undefined) {
        throw new ExpressError('Item Not Found', 404)
    }
    res.json({ item });
})

router.post('/', function (req, res) {
    const newItem = ({
        name: req.body.name,
        price: req.body.price
    })
    ITEMS.push(newItem);
    res.status(201).json({ item: newItem })
})

router.patch('/:name', function (req, res) {
    const founditem = ITEMS.find(i => i.name === req.params.name)
    if (founditem === undefined) {
        throw new ExpressError("Item Not FOund", 404);
    }
    founditem.name = req.body.name;
    founditem.price = req.body.price;
    console.log(founditem)
    res.json({ item: founditem })
})

router.delete('/:name', function (req, res) {
    const item = ITEMS.find(i => i.name === req.params.name)
    if (item === undefined) {
        throw new ExpressError("Item Not FOund", 404);
    }
    ITEMS.splice(item, 1)
    res.json({ message: "DELETED" })
})


module.exports = router