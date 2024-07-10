const express = require("express");
const router = express.Router();
const getElectionbyID = require('../controllers/getElectionbyID');

router.get('/:id', getElectionbyID);
module.exports = router