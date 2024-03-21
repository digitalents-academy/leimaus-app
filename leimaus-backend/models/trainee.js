const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for trainee
const TraineeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name string is required'],
  }
});

// Create model for trainee
const Trainee = mongoose.model('Trainee', TraineeSchema);

module.exports = Trainee;