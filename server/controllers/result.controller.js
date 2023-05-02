const Result = require('../models/result.model');
const City = require('../models/city.model');
const State = require('../models/state.model');
const { Op } = require("sequelize");
const { PythonShell } = require('python-shell');

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
        console.log(niche, state_id, min, max)

        const state = await State.findByPk(state_id);

        if (!state) {
            return res.status(404).json({ error: 'State not found' });
        }

        // get cities by state and population range
        const cities = await City.findAll({
            where: {
                state_id: state_id,
                population: {
                    [Op.between]: [min, max]
                }
            }
        });

        console.log('Cities:', cities);

        const options = {
            mode: 'text',
            pythonOptions: ['-u'], // unbuffered output
            pythonPath: '/usr/local/bin/python3',
            scriptPath: './python/data_analysis',
            args: [niche, state.name, JSON.stringify(cities)],
        };

        PythonShell.run('main.py', options, async (err, results) => {
            if (err) {
                console.error("PythonShell error:", err);
                res.status(500).json(err);
            } else {
                // Process the returned results
                const processedData = JSON.parse(results[0]);

                // Store the search results in the MySQL database in the results table
                // const createdResults = await Result.bulkCreate(processedData);

                // Return the search results to the front end
                res.status(201).json(processedData);
            }
        });

    } catch (err) {
        res.status(500).json(err);
    }
}
