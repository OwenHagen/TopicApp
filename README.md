# TopicApp - React Native Vehicle Info & Feedback System

**CSCI 411 – Final Project**  
**Developer: Owen Hagen**  
**Instructor: Dr. Cavalcanti**

## Important Notice

**The backend server (hosted on a Google Cloud VM) is currently offline.**  
API endpoints will not respond unless the server is restarted or self-hosted.  
This repository is for code review and demonstration purposes only.

## Overview

TopicApp is a multi-screen mobile application built with React Native and backed by a Django REST API hosted on a Google Cloud virtual machine. The app allows users to input car information, search and view results, visualize car locations on a map, and submit user feedback through a real-time chart-based interface.

The project was developed to fulfill the final exam requirements for CSCI 411, demonstrating practical knowledge of full-stack development, cloud deployment, and mobile UI design.

## Features

### Navigation
- Multi-screen application with both tab and stack navigation
- Swipe-enabled transitions between core tabs
- Main tabs: Add, Search, Map, Feedback

### Add Car Screen
- Users enter car details: name, manufacturer, country of origin, category
- Country name is geocoded into latitude and longitude via OpenCage Data API

### Search Car Screen
- Search by manufacturer, country, or category
- Search results displayed using React Native’s FlatList component
- Graceful handling of no-result scenarios

### Map View
- Displays geolocated car entry on an interactive map
- Map zooms into user-submitted coordinates
- Integrated navigation to Feedback screen

### Feedback System
- Two-step feedback process:
  1. Like or dislike the app
  2. Select one or more predefined reasons
- Data submitted to backend and stored in MySQL
- Aggregated feedback displayed as a bar chart using `react-native-chart-kit`

## Technologies Used

### Frontend
- React Native with Expo
- Visual Studio Code
- Expo Go App (for mobile testing)
- Key Libraries:
  - `react-navigation`
  - `axios`
  - `react-native-chart-kit`
  - `react-native-svg`

### Backend
- Django REST Framework
- MySQL for persistent storage
- Apache2 web server
- Hosted on Ubuntu-based Google Cloud VM

## Setup Instructions

### Frontend (React Native)
```bash
git clone https://github.com/your-username/topicapp.git
cd topicapp
npm install
npx expo start
