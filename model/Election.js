// const mongoose = require('mongoose');
// const partySchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     votes: {
//         type: Number,
//         default: 0
//     }
// });

// const electionSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     parties: [partySchema], // Array of party objects
//     status: {
//         type: String,
//         enum: ['Live', 'Upcoming', 'Closed'],
//         required: true,
//       },
//     createdBy: {
//         type: String,
//         default: "Root"
//     },
//     voters: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }]
// });

// const Election = mongoose.model('Election', electionSchema);
// module.exports = Election;

const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
});

const electionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    parties: [partySchema], // Array of party objects
    status: {
        type: String,
        enum: ['Live', 'Upcoming', 'Closed'],
        required: true,
    },
    createdBy: {
        type: String,
        default: "Root"
    },
    voters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    votingEndTime: {
        type: Date,
        required: true
    }
});

const Election = mongoose.model('Election', electionSchema);
module.exports = Election;








