const express = require("express");
const authenticateRoot = require('../middleware/authenticateRoot');
const router = express.Router();
const createElection = require('../controllers/createElection');

// creation of election by root user
// this is the route
router.post('/elections',createElection);


// ,authenticateRoot

module.exports = router;