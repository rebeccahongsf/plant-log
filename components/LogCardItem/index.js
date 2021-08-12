import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const LogCardItem = (props) => {
  const { log } = props;

  var month = new Date(log.date).toLocaleDateString('en', {
    month: 'short',
  });

  var day = new Date(log.date).toLocaleDateString('en', {
    day: 'numeric',
  });

  var year = new Date(log.date).toLocaleDateString('en', {
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View  style={styles.left}>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.year}>{year}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.note}>{log.note}</Text>
      </View>
    </View>
  );
};

export default LogCardItem;
