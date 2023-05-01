const Result = require('../models/result.model');
const { City } = require('../models/city.model');
const { State } = require('../models/state.model');
const { Op } = require("sequelize");
const { spawn } = require('child_process');
const path = require('path');

exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getResultsByCity = async (req, res) => {
    try {
        const results = await Result.findAll({
            where: {
                city_id: req.params.city_id
            }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getResultById = async (req, res) => {
    try {
        const result = await Result.findByPk(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.createResult = async (req, res) => {
    try {
        const { niche, state_id, min, max } = req.body;
        const state = await State.findByPk(state_id);

        // get cities by state and population range
        const cities = await City.findAll({
            where: {
                state_id: state_id,
                population: {
                    [Op.between]: [min, max]
                }
            }
        });

        // Define path to python script
        const scriptPath = path.join(__dirname, '../python/data_analysis/main.py');

        // Run your Python script and send state, niche, and cities as arguments
        const pythonProcess = spawn('python', [scriptPath, state, niche, JSON.stringify(cities)]);

        // Process and analyze the response data using LangChain and Python

        const processedData = [
            // ... your processed data here
        ];

        // Store the search results in the MySQL database in the results table
        const createdResults = await Result.bulkCreate(processedData);

        // Return the search results to the front end
        res.status(201).json(createdResults);
    } catch (err) {
        res.status(500).json(err);
    }
}
