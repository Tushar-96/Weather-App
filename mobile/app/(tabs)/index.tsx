import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Image, Keyboard, ImageBackground } from 'react-native';
import { fetchWeatherFromBackend } from '../../src/services/backendService';

const BACKGROUND_IMAGE = { uri: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80' };

const COLORS = {
  purpleDark: '#52357B',
  purple: '#5459AC',
  blue: '#648DB3',
  mint: '#B2D8CE',
  white: '#fff',
  textDark: '#222',
  textLight: '#fff',
  error: '#D7263D',
  gray: '#ccc',
};

function getCurrentDate() {
  const date = new Date();
  return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function HomeTab() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);
    Keyboard.dismiss();
    try {
      const data = await fetchWeatherFromBackend(city);
      setWeather(data);
    } catch (e) {
      setError('City not found or error fetching weather');
    }
    setLoading(false);
  };

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Weather Forecast</Text>
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Enter city name"
              value={city}
              onChangeText={setCity}
              placeholderTextColor={COLORS.purple}
              returnKeyType="search"
              onSubmitEditing={getWeather}
            />
            <TouchableOpacity style={styles.searchButton} onPress={getWeather}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
          {loading && <ActivityIndicator size="large" color={COLORS.purpleDark} style={{ marginTop: 30 }} />}
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {weather && (
            <View style={styles.centeredCard}>
              <Image
                source={{ uri: weather.iconUrl }}
                style={styles.weatherIcon}
                resizeMode="contain"
              />
              <Text style={styles.temp}>{weather.temp_c}°C</Text>
              <Text style={styles.condition}>{weather.condition}</Text>
              <Text style={styles.city}>{weather.city}</Text>
              <Text style={styles.date}>{getCurrentDate()}</Text>
              <View style={styles.detailsRow}>
                <View style={styles.detailCard}>
                  <Text style={styles.detailLabel}>Humidity</Text>
                  <Text style={styles.detailValue}>{weather.raw?.main?.humidity ?? '--'}%</Text>
                </View>
                <View style={styles.detailCard}>
                  <Text style={styles.detailLabel}>Wind</Text>
                  <Text style={styles.detailValue}>{weather.raw?.wind?.speed ?? '--'} m/s</Text>
                </View>
                <View style={styles.detailCard}>
                  <Text style={styles.detailLabel}>Feels Like</Text>
                  <Text style={styles.detailValue}>{weather.raw?.main?.feels_like ? Math.round(weather.raw.main.feels_like) : '--'}°C</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(82, 53, 123, 0.55)' },
  container: { flexGrow: 1, padding: 24, justifyContent: 'flex-start' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: COLORS.white, marginBottom: 32, marginTop: 16, letterSpacing: 1, textShadowColor: COLORS.purpleDark, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 },
  searchBarContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 32, backgroundColor: COLORS.white + 'CC', borderRadius: 16, paddingHorizontal: 8, paddingVertical: 4, shadowColor: COLORS.purpleDark, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  searchBar: { flex: 1, fontSize: 18, padding: 10, color: COLORS.purpleDark, backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.gray, borderRadius: 8 },
  searchButton: { backgroundColor: COLORS.purpleDark, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 18, marginLeft: 8 },
  searchButtonText: { color: COLORS.mint, fontWeight: 'bold', fontSize: 16 },
  error: { color: COLORS.error, textAlign: 'center', marginTop: 10, fontSize: 16 },
  centeredCard: { backgroundColor: 'rgba(255,255,255,0.55)', borderRadius: 36, alignItems: 'center', padding: 36, marginTop: 16, shadowColor: COLORS.purpleDark, shadowOpacity: 0.15, shadowRadius: 24, elevation: 6 },
  weatherIcon: { width: 100, height: 100, marginBottom: 18 },
  temp: { fontSize: 64, fontWeight: 'bold', color: COLORS.purple, marginBottom: 8, textShadowColor: COLORS.mint, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 },
  condition: { fontSize: 22, fontWeight: '600', color: COLORS.purpleDark, marginBottom: 2, letterSpacing: 0.5 },
  city: { fontSize: 20, color: COLORS.blue, marginBottom: 2, fontWeight: 'bold', letterSpacing: 0.5 },
  date: { fontSize: 16, color: COLORS.purple, marginBottom: 18, letterSpacing: 0.5 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 18 },
  detailCard: { flex: 1, alignItems: 'center', backgroundColor: COLORS.mint, borderRadius: 18, marginHorizontal: 6, padding: 14, shadowColor: COLORS.purpleDark, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 },
  detailLabel: { fontSize: 14, color: COLORS.purple, marginBottom: 2, fontWeight: '600' },
  detailValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.purpleDark },
});
