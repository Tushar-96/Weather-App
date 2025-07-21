import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api'; // Local backend for development

export async function fetchWeatherFromBackend(city) {
  try {
    const res = await axios.get(`${BASE_URL}/weather`, { params: { city } });
    return res.data;
  } catch (e) {
    console.log('Error fetching weather from backend:', e?.response?.data || e.message || e);
    throw e;
  }
}
