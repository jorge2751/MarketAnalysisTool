const express = require("express");
const router = express.Router();
const stateController = require('../controllers/state.controller');

// GET - READ ALL STATES
router.get('/', stateController.getAllStates);

module.exports = router;