// models/Vote.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election',
        required: true
    },
    party: {
        type: String,
        required: true
    }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
