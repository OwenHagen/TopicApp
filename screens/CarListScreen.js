// Author: Owen Hagen
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const CarListScreen = ({ route, navigation }) => {
  const { cars } = route.params;
  console.log('Cars passed to CarListScreen:', cars);


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('MapViewScreen', {
          name: item.name,
          manufacturer: item.manufacturer,
          country: item.country,
          coords: { lat: item.lat, lng: item.lng },
        })
      }
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>
        {item.manufacturer} - {item.country} - {item.category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Results</Text>
      <FlatList
        data={cars}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No cars found.</Text>}
      />
    </View>
  );
};

export default CarListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffe4e1', // Light red background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#b22222',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff5f5',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c41c1c',
  },
  details: {
    marginTop: 4,
    fontSize: 14,
    color: '#333',
  },
});
