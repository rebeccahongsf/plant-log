import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CameraRoll from '../components/CameraRoll';

export default function AddPlantScreen() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState(Date.now());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View>
      <Text>Add Plant</Text>
      <TextInput
        placeholder="Plant Name"
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        placeholder="Plant Type"
        onChangeText={(type) => setType(type)}
      />
      
      <DateTimePicker
        value={date}
        mode={'date'}
        display="spinner"
        onChange={onChange}
      />
      {/* <CameraRoll /> */}
    </View>
  );
}
