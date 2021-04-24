import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const LogCardItem = (props) => {
  const { log } = props;

  return (
    <View>
      <Text>Date</Text>
      <Text>Notes</Text>
    </View>
  );
};

export default LogCardItem;
