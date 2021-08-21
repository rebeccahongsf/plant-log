import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';

const PlantDetailsHeader = ({ props }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.header}>
      {props.imageUri ? (
        <View>
          <Image
            source={{
              uri: props.imageUri,
            }}
            style={styles.avatar}
          />
        </View>
      ) : null}
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.type}>{props.type}</Text>
      <Text style={styles.date}>
        Water every {props.frequency} {props.duration}
      </Text>
      <Button
        title="Add Log"
        onPress={() =>
          navigation.navigate('AddLog', {
            id: route.params.id,
          })
        }
      />
    </View>
  );
};

export default PlantDetailsHeader;
