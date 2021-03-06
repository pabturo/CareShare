import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ToDo from '../Components/ToDo.js';

import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function App({ navigation, route }) {
  const [checked, setChecked] = useState(false);

  const { text, deleteToDo } = route.params;

  const deleteAndGoToList = async () => {
    await deleteToDo();
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <BouncyCheckbox
        checked
        textColor="#000"
        fillColor="red"
        text={'done!'}
        onPress={(checked) => deleteAndGoToList()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 50,
    fontFamily: 'Arial',
    textAlign: 'center',
  },
});
