import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, FlatList } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import LogCardItem from '../components/LogCardItem';
import PlantDetailsHeader from '../components/PlantDetailsHeader';

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
      <FlatList
        ListHeaderComponent={<PlantDetailsHeader props={plantDetail} />}
        stickyHeaderIndices={[0]}
        data={plantLog}
        renderItem={({ item }) => <LogCardItem log={item} />}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  list: {
    paddingTop: 150,
    zIndex: 0,
    height: '100%',
  },
});
