import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function WeatherCard({ weather }) {
  const { unit } = useAppContext();
  if (!weather) return null;
  const temp = unit === 'imperial' ? weather.temp_f : weather.temp_c;
  const iconUrl = weather.iconUrl;
  return (
    <View style={styles.card}>
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      <View>
        <Text style={styles.temp}>{temp}°{unit === 'imperial' ? 'F' : 'C'}</Text>
        <Text style={styles.condition}>{weather.condition}</Text>
        <Text style={styles.city}>{weather.city}, {weather.country}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10, elevation: 2 },
  icon: { width: 60, height: 60, marginRight: 16 },
  temp: { fontSize: 32, fontWeight: 'bold' },
  condition: { fontSize: 18 },
  city: { fontSize: 14, color: '#888' },
}); 