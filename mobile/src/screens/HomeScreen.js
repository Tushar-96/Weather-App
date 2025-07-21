import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { fetchWeatherFromBackend } from '../services/backendService';

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async () => {
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const data = await fetchWeatherFromBackend(city);
      setWeather(data);
    } catch (e) {
      setError('City not found or error fetching weather');
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Search" onPress={getWeather} />
      </View>
      {loading && <ActivityIndicator size="large" />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {weather && (
        <View style={styles.weatherBox}>
          <Text style={styles.weatherTitle}>Weather Data:</Text>
          {Object.entries(weather).map(([key, value]) => (
            <View key={key} style={styles.dataRow}>
              <Text style={styles.dataKey}>{key}:</Text>
              <Text style={styles.dataValue}>{typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'flex-start' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  inputRow: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginRight: 8 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  weatherBox: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 16, marginTop: 20 },
  weatherTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  dataRow: { flexDirection: 'row', marginBottom: 6 },
  dataKey: { fontWeight: 'bold', marginRight: 8, minWidth: 90 },
  dataValue: { flex: 1, flexWrap: 'wrap' },
}); 