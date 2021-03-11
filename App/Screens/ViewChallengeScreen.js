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
import Challenge from '../Components/Challenge.js';

import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function App({ navigation, route }) {
  const [checked, setChecked] = useState(false);

  const {challengeName, challengeDetails, deleteChallenge, index} = route.params;

  const deleteAndGoToList = async () => {
    await deleteChallenge(index);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{challengeName}</Text>
      <Text style={styles.text}>{challengeDetails}</Text>
      <BouncyCheckbox
        checked
        textColor="#000"
        fillColor="red"
        text={'Delete'}
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
    fontSize: 20,
    fontFamily: 'Arial',
    textAlign: 'center',
  },
});