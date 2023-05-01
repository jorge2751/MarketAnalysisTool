const State = require('../models/state.model');

exports.getAllStates = async (req, res) => {
    try {
        const states = await State.findAll();
        res.status(200).json(states);
    } catch (err) {
        res.status(500).json(err);
    }
}