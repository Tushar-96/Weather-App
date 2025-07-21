import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null;
  return (
    <FlatList
      data={forecast}
      horizontal
      keyExtractor={item => item.dt.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.day}</Text>
          <Text>{item.temp}°</Text>
          <Text>{item.condition}</Text>
        </View>
      )}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { marginVertical: 10 },
  item: { alignItems: 'center', marginRight: 16, backgroundColor: '#f0f0f0', borderRadius: 8, padding: 10 },
}); 