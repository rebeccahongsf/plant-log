import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const PlantCardItem = (props) => {
  const { plant } = props;

  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('PlantDetail', {
      id: plant.id,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {plant.imageUri ? (
            <Image
              source={{
                uri: plant.imageUri,
              }}
              style={styles.avatar}
            />
          ) : null}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{plant.name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PlantCardItem;
