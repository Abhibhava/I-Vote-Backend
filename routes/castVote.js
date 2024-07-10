const express = require('express');
const router = express.Router();
const castVote = require('../controllers/castVote');
//const auth = require('../middleware/auth');

// POST route to cast a vote in a specific election
router.post('/:id', castVote);

module.exports = router;
