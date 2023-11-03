const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const StampSchema = new Schema({
  date: {
    type: String,
    required: [true, 'The date string is required'],
  },
  data: {
    type: Array,
    required: [true, 'The stamp array is required']
  }
});

// Create model for todo
const Stamp = mongoose.model('Stamp', StampSchema);

module.exports = Stamp;