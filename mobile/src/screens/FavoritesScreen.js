import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { getFavorites, addFavorite, removeFavorite } from '../services/userService';
import WeatherCard from '../components/WeatherCard';
import { fetchWeatherByCity } from '../services/weatherService';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const loadFavorites = async () => {
    setLoading(true);
    const favs = await getFavorites();
    setFavorites(favs);
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleAdd = async () => {
    if (!city) return;
    try {
      const data = await fetchWeatherByCity(city);
      await addFavorite(data);
      setCity('');
      loadFavorites();
    } catch (e) {
      setError('City not found');
    }
  };

  const handleRemove = async (cityId) => {
    await removeFavorite(cityId);
    loadFavorites();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add city"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Add" onPress={handleAdd} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardRow}>
              <WeatherCard weather={item.weather} />
              <Button title="Remove" onPress={() => handleRemove(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  inputRow: { flexDirection: 'row', marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginRight: 8 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
}); 