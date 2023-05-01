const express = require("express");
const router = express.Router();
const cityController = require('../controllers/city.controller');

// GET - READ ALL CITIES
router.get('/all', cityController.getAllCities);

// GET - READ CITIES BY STATE
router.get('/state/:state_id', cityController.getCitiesByState);

// GET - READ CITY BY ID
router.get('/:id', cityController.getCityById);

// GET - READ CITIES BY STATE AND POPULATION RANGE
router.get('/state/:state_id/population/:min/:max', cityController.getCitiesByStateAndPopulationRange);

module.exports = router;