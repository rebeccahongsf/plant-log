import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {},
});
