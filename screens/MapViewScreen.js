// Author: Owen Hagen
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapViewScreen({ route, navigation }) {
  const { name, manufacturer, country, coords } = route.params;

  console.log('Received coords:', coords);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name} - {manufacturer}</Text>
      <Text style={styles.subtitle}>Origin: {country}</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coords.lat,
          longitude: coords.lng,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        <Marker
          coordinate={{ latitude: coords.lat, longitude: coords.lng }}
          title={name}
          description={`${manufacturer} - ${country}`}
        />
      </MapView>

      {/* Feedback Button */}
      <TouchableOpacity
        style={styles.feedbackButton}
        onPress={() => navigation.navigate('Feedback')}
      >
        <Text style={styles.feedbackText}>Leave Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#004080',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#0066cc',
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  feedbackButton: {
    backgroundColor: '#2196f3',
    padding: 14,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
    width: '60%',
  },
  feedbackText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
