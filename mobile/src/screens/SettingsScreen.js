import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function SettingsScreen() {
  const { unit, theme, updatePreferences } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text>Temperature Unit (°C/°F):</Text>
        <Switch
          value={unit === 'imperial'}
          onValueChange={val => updatePreferences({ unit: val ? 'imperial' : 'metric' })}
        />
        <Text>{unit === 'imperial' ? '°F' : '°C'}</Text>
      </View>
      <View style={styles.row}>
        <Text>Theme (Light/Dark):</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={val => updatePreferences({ theme: val ? 'dark' : 'light' })}
        />
        <Text>{theme === 'dark' ? 'Dark' : 'Light'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
}); 