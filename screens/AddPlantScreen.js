import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import { Picker } from 'react-native-woodpicker';
import * as ImagePicker from 'expo-image-picker';

export default function AddPlantScreen({ navigation }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imagePath, setImagePath] = useState('');
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
        imageUri: imagePath,
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

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage(pickerResult.uri);
    console.log(selectedImage);
    uploadImage(selectedImage);
  };

  const uploadImage = async (uri) => {
    console.log('URI:' + uri);
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref();

    var imageRef = ref.child(
      'images/' +
        uid +
        '/' +
        name +
        '/' +
        new Date().toLocaleDateString('en').replaceAll('/', '-')
    );

    console.log(imageRef.fullPath);

    return imageRef.put(blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  };

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
      <Button
        onPress={openImagePickerAsync}
        title="Pick a photo"
        style={styles.button}
      />
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
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
