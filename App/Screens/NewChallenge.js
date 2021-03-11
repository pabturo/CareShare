import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  Picker,
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

  // const [checked, setChecked] = useState(false);
  const [challengeName, setChallengeName] = useState('');
  const [challengeDetails, setChallengeDetails] = useState('');

  const {challenges, setChallenges} = route.params;

  const createNewChallenge = async () => {
    // await deleteChallenge(index);
    if (challengeName != '' && challengeDetails != ''){
      let newChallenges = [...challenges];
      let obj = {
        name : challengeName,
        details : challengeDetails
      };
      newChallenges.push(obj);
      setChallenges(newChallenges);
      navigation.navigate('Home');
  }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{"CREATE A CHALLENGE"}</Text>
      <TextInput
          style={styles.textinput}
          onChangeText={(challengeName) => setChallengeName(challengeName)}
          value={challengeName}
        />
      <TextInput
          style={styles.textinput}
          onChangeText={(challengeDetails) => setChallengeDetails(challengeDetails)}
          value={challengeDetails}
        />
    
      <BouncyCheckbox
        checked
        textColor="#000"
        fillColor="red"
        text={'Post'}
        onPress={(checked) => createNewChallenge()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  textinput: {
    height: 40,
    textAlign: 'center',
    borderColor: 'gray',
    width: '35%',
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 100,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: 150,
  },
  dropdown: {
    flex: 0.2,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: 'flex-start',
  },
});
