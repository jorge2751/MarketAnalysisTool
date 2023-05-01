const City = require('../models/city.model');
const { Op } = require("sequelize");

exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.findAll();
        res.status(200).json(cities);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getCitiesByState = async (req, res) => {
    try {
        const cities = await City.findAll({
            where: {
                state_id: req.params.state_id
            }
        });
        res.status(200).json(cities);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getCityById = async (req, res) => {
    try {
        const city = await City.findByPk(req.params.id);
        res.status(200).json(city);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getCitiesByStateAndPopulationRange = async (req, res) => {
    try {
        const cities = await City.findAll({
            where: {
                state_id: req.params.state_id,
                population: {
                    // numbers between min and max
                    [Op.between]: [req.params.min, req.params.max]
                }
            }
        });
        res.status(200).json(cities);
    } catch (err) {
        res.status(500).json(err);
    }
}