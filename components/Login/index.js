import firebase from 'firebase';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const Login = (props) => {
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

export default Login;
