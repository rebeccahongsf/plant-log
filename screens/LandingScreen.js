import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Login from '../components/Login';

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Plant Log</Text>
      <Login />
      <Button
        title="Don't have an account? Sign up now!"
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
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
});
