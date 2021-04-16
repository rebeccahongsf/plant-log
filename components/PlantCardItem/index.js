import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const PlantCardItem = (props) => {
  const { plant } = props;

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          source={{
            uri: plant.imageUri,
          }}
          style={styles.avatar}
        />
        <View style={styles.midContainer}>
          <Text style={styles.name}>{plant.name}</Text>
          <Text style={styles.type}>{plant.type}</Text>
          <Text style={styles.date}>Last Watering: {plant.date}</Text>
        </View>
      </View>
    </View>
  );
};

export default PlantCardItem;
