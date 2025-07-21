const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const axios = require('axios');

router.get('/:city', weatherController.getWeatherByCity);
router.get('/geo', weatherController.getWeatherByGeo);

// GET /api/weather?city=CityName
router.get('/', async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }
  try {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const BASE_URL = 'https://api.openweathermap.org/data/2.5';
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });
    const data = response.data;
    res.json({
      city: data.name,
      country: data.sys.country,
      temp_c: Math.round(data.main.temp),
      temp_f: Math.round(data.main.temp * 9/5 + 32),
      condition: data.weather[0].main,
      iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
      raw: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

module.exports = router; 