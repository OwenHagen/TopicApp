// Author: Owen Hagen
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const FeedbackReasonScreen = ({ route, navigation }) => {
  const { liked } = route.params;
  const [selectedReasons, setSelectedReasons] = useState([]);

  const loveReasons = ['Secure', 'Fast', 'Useful'];
  const hateReasons = ['Too Slow', 'Crashes'];
  const reasons = liked ? loveReasons : hateReasons;

  const toggleReason = (reason) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter(r => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const submitFeedback = async () => {
    if (selectedReasons.length === 0) {
      Alert.alert('Please select at least one reason');
      return;
    }

    try {
      const response = await fetch('http://34.56.118.170:8000/api/feedback/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          liked,
          reasons: selectedReasons,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('FeedbackChartScreen');
      } else {
        console.error('Feedback error:', data);
        Alert.alert('Error submitting feedback');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Network Error', 'Could not connect to server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {liked ? '❤️ Why did you love it?' : '💔 Why did you hate it?'}
      </Text>

      {reasons.map(reason => (
        <TouchableOpacity
          key={reason}
          style={[
            styles.reasonButton,
            selectedReasons.includes(reason) && styles.selectedReason,
          ]}
          onPress={() => toggleReason(reason)}
        >
          <Text style={styles.reasonText}>{reason}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
        <Text style={styles.submitText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackReasonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  reasonButton: {
    padding: 14,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginVertical: 8,
  },
  selectedReason: {
    backgroundColor: '#7fffd4',
  },
  reasonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#4169e1',
    padding: 14,
    borderRadius: 10,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
