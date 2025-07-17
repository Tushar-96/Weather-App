const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/:city', weatherController.getWeatherByCity);
router.get('/geo', weatherController.getWeatherByGeo);

module.exports = router; 