const express = require('express');
const router = express.Router();
const Stamp = require('../models/stamp');

router.post('/', async (req, res) => {
  try {
    if (req.body) {
      const date = req.body.date;
      const existingDate = await Stamp.findOne({ date: date });
      if (!existingDate) {
        await Stamp.create({ date: date, data: req.body.data });
        res.status(201).json({ success: true, message: "Task successfully added!" })
      } else {
        await Stamp.updateOne({ date: date }, { date: date, data: req.body.data })
        res.status(200).json({ success: true, message: "Task successfully edited!" });
      }
    }
  } catch (error) {
    console.log(error)
  }
});

router.get('/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const result = await Stamp.find({ 'data.name': name });
    const resList = [];
    result.forEach((r) => {
      const stamp = r.data.find((s) => s.name === name);
      resList.push({ date: r.date, stamp: stamp.stamp })
    })
    res.json(resList);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;