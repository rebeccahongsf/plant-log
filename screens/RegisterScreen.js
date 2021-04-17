import firebase from 'firebase';
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

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
    <View>
      <Text>Register</Text>
      <TextInput placeholder="name" onChangeText={(name) => setName(name)} />
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

export default RegisterScreen;
