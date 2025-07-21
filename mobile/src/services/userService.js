// All functions now use backend API endpoints instead of Firebase/Firestore
import axios from 'axios';

const BASE_URL = 'https://your-backend.com/api'; // Replace with your backend URL

export async function getFavorites() {
  // TODO: Implement backend call
  const res = await axios.get(`${BASE_URL}/favorites`);
  return res.data;
}

export async function addFavorite(weather) {
  // TODO: Implement backend call
  await axios.post(`${BASE_URL}/favorites`, { weather });
}

export async function removeFavorite(cityId) {
  // TODO: Implement backend call
  await axios.delete(`${BASE_URL}/favorites/${cityId}`);
}

export async function getPreferences() {
  // TODO: Implement backend call
  const res = await axios.get(`${BASE_URL}/preferences`);
  return res.data;
}

export async function setPreferences(prefs) {
  // TODO: Implement backend call
  await axios.post(`${BASE_URL}/preferences`, prefs);
} 