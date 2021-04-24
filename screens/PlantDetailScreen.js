import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, FlatList, Button } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import LogCardItem from '../components/LogCardItem';

export default function PlantDetailScreen({ navigation }) {
  const route = useRoute();
  // console.log(route.params);

  const [plantDetail, setPlantDetail] = useState([]);
  const [user, setUser] = useState();
  const { uid } = firebase.auth().currentUser;

  useEffect(() => {
    const fetchPlantDetail = async () => {
      const response = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('plants')
        .doc(route.params.id)
        .get()
        .then((documentSnapshot) => {
          setPlantDetail(documentSnapshot.data());
          console.log('got the plant details data!');
        });
      console.log(plantDetail);
    };
    fetchPlantDetail();
  }, []);

  return (
    <View>
      <Text>{plantDetail.name}</Text>
      <Text>{plantDetail.type}</Text>
      <Text>{plantDetail.location}</Text>
      <Text>
        Water every {plantDetail.frequency} {plantDetail.duration}
      </Text>
      {/* <FlatList /> */}
      <Button
        title="Add Log"
        onPress={() =>
          navigation.navigate('AddLog', {
            id: route.params.id,
          })
        }
      />
      <LogCardItem />
    </View>
  );
}