const State = require('../models/state.model');

// GET - READ ALL STATES
exports.getAllStates = async (req, res) => {
    try {
        const states = await State.findAll();
        res.status(200).json(states);
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET - READ STATE BY ID
exports.getStateById = async (req, res) => {
    console.log("Hello")
    try {
        const state = await State.findByPk(req.params.id);
        res.status(200).json(state);
    } catch (err) {
        res.status(500).json(err);
    }
}