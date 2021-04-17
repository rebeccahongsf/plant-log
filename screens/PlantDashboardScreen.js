import firebase from 'firebase';
import React, { useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import PlantCardItem from '../components/PlantCardItem';

import plants from '../data/Plants';
import { FlatList } from 'react-native-gesture-handler';

const logout = () => {
  firebase.auth().signOut();
};

export default function PlantDashboardScreen({ navigation }) {
  const requestLogout = useCallback(() => {
    logout();
  }, []);

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
      <Button title="logout" onPress={() => requestLogout()} />
      <Button
        title="Add Plant"
        onPress={() => navigation.navigate('AddPlant')}
      />
      <FlatList
        data={plants}
        renderItem={({ item }) => <PlantCardItem plant={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
