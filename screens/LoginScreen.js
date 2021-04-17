import firebase from 'firebase';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert('Login error, check logs!');
        console.log(error);
      });
    alert('Login completed!');
  };

  return (
    <View style={styles.container}>
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
        <Button onPress={() => onLogin()} title="Login" color="#fff" />
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

export default LoginScreen;
