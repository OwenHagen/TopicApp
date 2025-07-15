// Author: Owen Hagen
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FeedbackChoiceScreen({ navigation }) {
  const handleChoice = (choice) => {
    navigation.navigate('FeedbackReasonScreen', { liked: choice == 'love' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do You Like This App?</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4caf50' }]}
        onPress={() => handleChoice('love')}
      >
        <Text style={styles.buttonText}>❤️ Love it</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#f44336' }]}
        onPress={() => handleChoice('hate')}
      >
        <Text style={styles.buttonText}>💔 Hate it</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#ff6f00',
  },
  button: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 12,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
});
