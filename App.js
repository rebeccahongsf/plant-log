import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Check if firebase is already initialized, if not, initialize firebaseConfig
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import PlantDashboardScreen from './screens/PlantDashboardScreen';
import LandingScreen from './screens/LandingScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddPlantScreen from './screens/AddPlantScreen';
import PlantDetailScreen from './screens/PlantDetailScreen';
import AddLogScreen from './screens/AddLogScreen';

const Stack = createStackNavigator();

const onAuthStateChange = (callback) => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback({ loggedIn: true });
    } else {
      callback({ loggedIn: false });
    }
  });
};

const App = () => {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);

    return () => {
      unsubscribe();
    };
  }, []);

  if (!user.loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={PlantDashboardScreen} />
        <Stack.Screen name="AddPlant" component={AddPlantScreen} />
        <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
        <Stack.Screen name="AddLog" component={AddLogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
