import React from 'react';
import { View, Text } from 'react-native';
import PlantCardItem from '../components/PlantCardItem';

import plants from '../data/Plants';
import { FlatList } from 'react-native-gesture-handler';

export default function PlantDashboardScreen() {
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
      <FlatList
        data={plants}
        renderItem={({ item }) => <PlantCardItem plant={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
