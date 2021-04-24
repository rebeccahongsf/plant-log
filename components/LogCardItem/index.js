import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const LogCardItem = (props) => {
  const { log } = props;

  var date = new Date(log.date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View>
      <Text>{date}</Text>
      <Text>{log.note}</Text>
    </View>
  );
};

export default LogCardItem;
