import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import { Picker } from 'react-native-woodpicker';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

export default function AddPlantScreen({ navigation }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageUri, setImageUri] = useState('');
  const { uid } = firebase.auth().currentUser;

  const locationOptions = [
    { label: 'Bedroom', value: 'bedroom' },
    { label: 'Patio', value: 'patio' },
    { label: 'Living Room', value: 'livingroom' },
    { label: 'Dining Room', value: 'diningroom' },
    { label: 'Office', value: 'office' },
    { label: 'Backyard', value: 'backyard' },
    { label: 'Kitchen', value: 'kitchen' },
    { label: 'Other', value: 'other' },
  ];

  const durationOptions = [
    { label: 'Hours', value: 'hours' },
    { label: 'Days', value: 'days' },
    { label: 'Weeks', value: 'weeks' },
  ];

  const imageRef = firebase
    .storage()
    .ref()
    .child(
      'images/' +
        uid +
        '/' +
        name +
        '/' +
        new Date()
          .toLocaleDateString('en')
          .replaceAll('/', '-')
          .concat('-' + uuidv4())
    );

  const submitForm = () => {
    alert('submit!');

    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('plants')
      .doc()
      .set({
        name,
        type,
        frequency,
        duration: duration.value,
        location: location.value,
        imageUri,
      })
      .then(() => {
        console.log('Plant completed!');
      })
      .catch((error) => {
        console.log('Error getting document: ', error);
      });
    navigation.navigate('Dashboard');
  };

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!name) {
      alert('Please fill in plant name first!');
      return;
    }

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log('Picking...');

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage(pickerResult.uri);
    uploadImage(pickerResult.uri);
  };

  const uploadImage = async (uri) => {
    console.log('uploading image!');
    const response = await fetch(uri);
    const blob = await response.blob();
    const snapshot = await imageRef.put(blob);
    await snapshot.ref.getDownloadURL().then((url) => {
      console.log(url);
      setImageUri(url);
    });
    return;
  };

  // if (selectedImage !== null) {
  //   uploadImage(selectedImage);
  // }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Name</Text>
        <TextInput
          placeholder="Alexander the Great"
          onChangeText={(name) => setName(name)}
          style={styles.inputText}
        />

        <Text style={styles.labelText}>Plant Type</Text>

        <TextInput
          placeholder="Epipremnum aureum"
          onChangeText={(type) => setType(type)}
          style={styles.inputText}
        />
      </View>

      <View style={styles.daysContainer}>
        <Text style={styles.labelText}>How often do you water?</Text>
        <View style={styles.inlineContainer}>
          <Text style={styles.labelText}>Every</Text>
          <TextInput
            placeholder="1"
            onChangeText={(frequency) => setFrequency(frequency)}
            style={styles.inputNum}
            keyboardType={'number-pad'}
          />
          <Picker
            onItemChange={(item) => setDuration(item)}
            items={durationOptions}
            title="Duration"
            placeholder="Select Duration"
            item={duration}
            style={styles.pickerInput}
          />
        </View>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.labelText}>Select plant location:</Text>
        <Picker
          onItemChange={(item) => setLocation(item)}
          items={locationOptions}
          title="Location"
          placeholder="Select Location"
          item={location}
          style={styles.pickerInput}
        />
      </View>
      <View style={styles.container}>
        {selectedImage === null ? (
          <Button
            onPress={openImagePickerAsync}
            title="Pick a photo"
            style={styles.button}
          />
        ) : (
          <Image source={{ uri: selectedImage }} style={styles.thumbnail} />
        )}
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
  inputContainer: {},
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
  daysContainer: {},
  inlineContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputNum: {
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 15,
    padding: 5,
    width: 50,
    textAlign: 'center',
    borderBottomColor: '#ccc',
    borderStyle: 'solid',
    borderBottomWidth: 3,
  },
  locationContainer: {},
  button: {
    backgroundColor: '#ccc',
    padding: 5,
    width: '100%',
  },
  pickerInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    borderBottomWidth: 3,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    minWidth: 100,
  },
  thumbnail: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});
