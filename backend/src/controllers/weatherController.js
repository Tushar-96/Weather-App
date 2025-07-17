const axios = require('axios');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get weather by city name
exports.getWeatherByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric', // or 'imperial'
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

// Get weather by GPS coordinates
exports.getWeatherByGeo = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric', // or 'imperial'
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
}; 