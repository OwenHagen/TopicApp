// Author: Owen Hagen
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

// Function to get coordinates from country name
const getCoordsFromCountry = async (country) => {
  try {
    const apiKey = 'ba1337561ccf499c92823299a2b2a250'; // OpenCage API key
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        country
      )}&key=${apiKey}`
    );
    const data = await response.json();

    console.log('Geocode response for', country, JSON.stringify(data, null, 2));

    if (data && data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { lat, lng };
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }
  return { lat: null, lng: null };
};

const AddCarScreen = () => {
  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
    if (!name || !manufacturer || !country || !category) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const { lat, lng } = await getCoordsFromCountry(country);
      console.log('📍 Received coords:', { lat, lng });

      const response = await fetch('http://34.56.118.170:8000/api/cars/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          manufacturer,
          country,
          category,
          lat,
          lng,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Car added successfully');
        setName('');
        setManufacturer('');
        setCountry('');
        setCategory('');
      } else {
        Alert.alert('Error', 'Failed to add car');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      Alert.alert('Network Error', 'Could not connect to server');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🚗 Add Car Info</Text>

      <TextInput
        style={styles.input}
        placeholder="Car Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Manufacturer"
        value={manufacturer}
        onChangeText={setManufacturer}
      />
      <TextInput
        style={styles.input}
        placeholder="Country of Origin"
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="Category (e.g. SUV)"
        value={category}
        onChangeText={setCategory}
      />

      <Button title="Add Car" onPress={handleSubmit} color="#fff" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ff4c4c', // Red
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
  },
});

export default AddCarScreen;
