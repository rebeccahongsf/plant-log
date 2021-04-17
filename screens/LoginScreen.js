import firebase from 'firebase';
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    alert('Signup completed!');
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={() => onSignUp()} title="Sign Up" />
    </View>
  );
};

export default LoginScreen;
