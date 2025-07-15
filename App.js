// Author: Owen Hagen
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import AddCarScreen from './screens/AddCarScreen';
import SearchCarScreen from './screens/SearchCarScreen';
import CarListScreen from './screens/CarListScreen';
import MapViewScreen from './screens/MapViewScreen';
import FeedbackChoiceScreen from './screens/FeedbackChoiceScreen';
import FeedbackReasonScreen from './screens/FeedbackReasonScreen';
import FeedbackChartScreen from './screens/FeedbackChartScreen';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Add Car"
      swipeEnabled={true}
      screenOptions={{
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tab.Screen name="Add Car" component={AddCarScreen} />
      <Tab.Screen name="Search Cars" component={SearchCarScreen} />
      <Tab.Screen name="Feedback" component={FeedbackChoiceScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="CarListScreen" component={CarListScreen} />
        <Stack.Screen name="MapViewScreen" component={MapViewScreen} />
        <Stack.Screen name="Feedback" component={FeedbackChoiceScreen} />
        <Stack.Screen name="FeedbackReasonScreen" component={FeedbackReasonScreen} />
        <Stack.Screen name="FeedbackChartScreen" component={FeedbackChartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



