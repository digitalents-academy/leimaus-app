const express = require('express');
const router = express.Router();
const Trainee = require('../models/trainee');

router.post('/', async (req, res) => {
    try {
        if (req.body) {
            const result = await Trainee.create({ name: req.body.name });
            res.json(result)
        }
    } catch (error) {
        console.log(error)
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await Trainee.find({});
        const results = [];
        result.forEach((r) => {
            results.push({ name: r.name, stamp: null })
        })
        results.sort((a, b) => a.name.localeCompare(b.name));
        res.json(results);
    } catch (error) {
        console.log(error)
    }
})

router.delete('/', async (req, res) => {
    try {
        const result = await Trainee.findOneAndDelete({ name: req.body.name });
        res.json(result)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;