// Author: Owen Hagen
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function FeedbackChartScreen({ navigation }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('http://34.56.118.170:8000/api/feedback/stats/')
      .then(res => res.json())
      .then(data => {
        const hateReasons = Object.keys(data.hate);
        const loveReasons = Object.keys(data.love);

        const allReasons = [...hateReasons, ...loveReasons];
        const values = [...hateReasons.map(r => data.hate[r]), ...loveReasons.map(r => data.love[r])];

        const barColors = [
          '#f44336', // Too Slow
          '#e91e63', // Crashes
          '#4caf50', // Secure
          '#2196f3', // Fast
          '#ff9800', // Useful
        ];

        setChartData({
          labels: allReasons,
          values,
          colors: barColors,
        });
      })
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  if (!chartData) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📊 Current Feedback</Text>

      <View style={styles.emojiRow}>
        <Text style={styles.emoji}>😢</Text>
        <Text style={styles.emoji}>😊</Text>
      </View>

      <View style={styles.outlineWrapper}>
        <View style={[styles.outlineBox, styles.hateBox]} />
        <View style={[styles.outlineBox, styles.loveBox]} />
      </View>

      <BarChart
        data={{
          labels: chartData.labels,
          datasets: [
            {
              data: chartData.values,
              colors: chartData.colors.map(c => () => c),
            },
          ],
        }}
        width={screenWidth - 40}
        height={300}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#333',
          backgroundGradientFrom: '#333',
          backgroundGradientTo: '#333',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => '#fff',
          propsForBackgroundLines: {
            stroke: '#555',
          },
          barPercentage: 0.7,
        }}
        style={styles.chart}
        fromZero
        withCustomBarColorFromData
        flatColor
        segments={4}
        withInnerLines={false}
        showBarTops={false}
      />
      <View style={styles.buttonContainer}>
        <Text style={styles.backButton} onPress={() => navigation.navigate('Tabs')}>
          ⬅️ Back to Add Screen
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 450,
    backgroundColor: '#1e1e1e', // solid dark grey
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  loading: {
    marginTop: 100,
    fontSize: 18,
    color: '#aaa',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 42,
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
  },
  outlineWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth - 40,
    height: 400,
    marginTop: 140,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  outlineBox: {
    position: 'absolute',
    borderWidth: 2,
    borderStyle: 'dashed',
    height: '90%',
    borderRadius: 6,
    top: 0,
  },
  hateBox: {
    left: 0,
    width: (screenWidth - 40) * (2.4 / 5),
    borderColor: '#e53935',
  },
  loveBox: {
    right: 0,
    width: (screenWidth - 40) * (2.6 / 5),
    borderColor: '#1e88e5',
  },
  chart: {
    marginTop: 20,
    borderRadius: 16,
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#1e90ff',
    textAlign: 'center',
    padding: 12,
    backgroundColor: '#292929',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1e90ff',
  },

});
