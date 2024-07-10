// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['Root', 'Normal'],
        default: 'Normal' // New users are set as Normal by default
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
