import firebase from 'firebase';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RegisterScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    alert('Signup completed!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="ios-person" size={25} color="#4F8EF7" />
        <TextInput placeholder="name" onChangeText={(name) => setName(name)} />
      </View>
      <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="ios-mail" size={25} color="#4F8EF7" />
        <TextInput
          placeholder="email"
          onChangeText={(email) => setEmail(email)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="ios-key" size={25} color="#4F8EF7" />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.button}>
        <Button onPress={() => onSignUp()} title="Sign Up" color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 25,
  },
  icon: {
    marginRight: 10,
  },
  inputText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ccc',
    padding: 5,
    width: '100%',
  },
});

export default RegisterScreen;
