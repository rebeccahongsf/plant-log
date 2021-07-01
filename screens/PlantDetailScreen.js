import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import LogCardItem from '../components/LogCardItem';

export default function PlantDetailScreen({ navigation }) {
  const route = useRoute();
  // console.log(route.params);

  const [plantDetail, setPlantDetail] = useState([]);
  const [plantLog, setPlantLog] = useState([]);
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
          console.log('got the plant details data: ' + plantDetail);
        });
    };

    const fetchPlantLog = async () => {
      const response = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('plants')
        .doc(route.params.id)
        .collection('logs')
        .get()
        .then((querySnapshot) => {
          setPlantLog(
            querySnapshot.docs.map((doc) => {
              const data = doc.data();
              const id = doc.id;
              return { id, ...data };
            })
          );
          console.log(plantLog);
        });
    };
    fetchPlantDetail();
    fetchPlantLog();
  }, []);

  return (
    <View style={styles.container}>
      {plantDetail.imageUri ? (
        <View>
          <Image
            source={{
              uri: plantDetail.imageUri,
            }}
            style={styles.avatar}
          />
        </View>
      ) : null}
      <Text style={styles.name}>{plantDetail.name}</Text>
      <Text style={styles.type}>{plantDetail.type}</Text>
      <Text style={styles.date}>
        Water every {plantDetail.frequency} {plantDetail.duration}
      </Text>
      <Button
        title="Add Log"
        onPress={() =>
          navigation.navigate('AddLog', {
            id: route.params.id,
          })
        }
      />
      <FlatList
        data={plantLog}
        renderItem={({ item }) => <LogCardItem log={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  avatar: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  type: {
    fontStyle: 'italic',
  },
  date: {
    fontSize: 14,
    color: 'grey',
  },
  button: {
    backgroundColor: '#ccc',
    padding: 5,
    width: '100%',
  },
});
