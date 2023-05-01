const express = require("express");
const router = express.Router();
const resultController = require('../controllers/result.controller');

// GET - READ ALL RESULTS
router.get('/all', resultController.getAllResults);

// GET - READ RESULTS BY CITY
router.get('/city/:city_id', resultController.getResultsByCity);

// GET - READ RESULT BY ID
router.get('/:id', resultController.getResultById);

// POST - CREATE RESULT
router.post('/', resultController.createResult);

module.exports = router;