const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for user
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name string is required'],
    },
    password: {
        type: String,
        required: [true, 'The pasword is required']
    }
});

// Create model for user
const User = mongoose.model('User', UserSchema);

module.exports = User;