// Author: Owen Hagen
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

const API_BASE = 'http://34.56.118.170:8000/api'; 

export default function SearchCarScreen({ navigation }) {
  const [manufacturer, setManufacturer] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`${API_BASE}/cars/search/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ manufacturer, country, category }),
      });

      const data = await response.json();
      console.log('Fetched cars:', data);

      if (!Array.isArray(data)) {
        Alert.alert('Unexpected response from server.');
        return;
      }

      navigation.navigate('CarListScreen', { cars: data });
    } catch (error) {
      console.error('Search failed:', error);
      Alert.alert('Search failed', 'Please try again later.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Search Cars</Text>
      <TextInput
        placeholder="Manufacturer"
        value={manufacturer}
        onChangeText={setManufacturer}
        style={styles.input}
      />
      <TextInput
        placeholder="Country of Origin"
        value={country}
        onChangeText={setCountry}
        style={styles.input}
      />
      <TextInput
        placeholder="Category (SUV, Sedan, etc)"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    padding: 20,
    justifyContent: 'flex-start',
    paddingTop: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 24,
    color: '#00796b',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00796b',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});

