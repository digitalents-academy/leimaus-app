const express = require('express');
const router = express.Router();
const Stamp = require('../models/stamp');

router.post('/stamps', async (req, res) => {
  try {
    if (req.body) {
      await Stamp.create({ date: req.body.date, data: req.body.data });
    }
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;