import firebase from 'firebase';
import 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import PlantCardItem from '../components/PlantCardItem';

import plants from '../data/Plants';
import { FlatList } from 'react-native-gesture-handler';

const logout = () => {
  firebase.auth().signOut();
};

export default function PlantDashboardScreen({ navigation }) {
  const [plants, setPlants] = useState([]);
  const { uid } = firebase.auth().currentUser;

  const requestLogout = useCallback(() => {
    logout();
  }, []);

  useEffect(() => {
    const fetchPlants = async () => {
      const response = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('plants')
        .get()
        .then((querySnapshot) => {
          setPlants(
            querySnapshot.docs.map((doc) => {
              const data = doc.data();
              const id = doc.id;
              return { id, ...data };
            })
          );
          console.log('got the plant data!');
        });
      console.log(plants);
    };
    fetchPlants();
  }, [plants]);

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
