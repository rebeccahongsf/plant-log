import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

export default function AddLogScreen({ navigation }) {
  const route = useRoute();
  // console.log(route.params);

  const [date, setDate] = useState(Date.now());
  const [note, setNote] = useState('');
  const [user, setUser] = useState();
  const { uid } = firebase.auth().currentUser;

  const submitForm = () => {
    alert('submit!');
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('plants')
      .doc(route.params.id)
      .collection('logs')
      .doc()
      .set({
        date,
        note,
      })
      .then(() => {
        console.log('Log completed!');
      })
      .catch((error) => {
        console.log('Error getting document: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Notes</Text>

        <TextInput
          placeholder="Lorem ipsum dolor phaium"
          onChangeText={(type) => setNote(type)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.button}>
        <Button onPress={() => submitForm()} title="Done" color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  inputText: {
    fontSize: 16,
    marginBottom: 15,
    borderBottomColor: '#ccc',
    borderStyle: 'solid',
    borderBottomWidth: 3,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#ccc',
    padding: 5,
    width: '100%',
  },
});
