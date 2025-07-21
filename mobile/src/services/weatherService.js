import axios from 'axios';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // <-- Replace with your key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeatherByCity(city, unit = 'metric', isCoords = false) {
  let url = BASE_URL;
  let params = {
    appid: API_KEY,
    units: unit,
  };
  if (isCoords) {
    const [lat, lon] = city.split(',');
    params.lat = lat;
    params.lon = lon;
  } else {
    params.q = city;
  }
  const res = await axios.get(url, { params });
  const data = res.data;
  return {
    city: data.name,
    country: data.sys.country,
    temp_c: Math.round(data.main.temp),
    temp_f: Math.round(data.main.temp * 9/5 + 32),
    condition: data.weather[0].main,
    iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
    id: data.id,
    raw: data,
  };
} 