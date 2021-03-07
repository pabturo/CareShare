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
  TouchableOpacity,
} from 'react-native';
import Challenge from '../Components/Challenge.js';

import { Ionicons } from '@expo/vector-icons';

export default function App({ navigation }) {
  const [Challenges, setChallenges] = useState([]);
  const [text, setText] = useState('');

  const addChallenge = () => {
    // Deep copy of array avoids any state mutation instead of state update rerender issues
    if (text != '') {
      let newChallenges = [...Challenges];
      newChallenges.push(text);
      setChallenges(newChallenges);
      setText('');
    }
  };

  const delay = (time) => new Promise((response) => setTimeout(response, time));

  const deleteChallenge = async (index) => {
    await delay(100);
    let newChallenges = [...Challenges];
    newChallenges.splice(index, 1);
    setChallenges(newChallenges);
    console.log('deleted item from list');
  };

  const renderChallenge = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('View To-Do', {
            text: item,
            deleteChallenge: deleteChallenge,
            index: index,
          })
        }>
        <Challenge text={item} deleteChallenge={() => deleteChallenge(index)} />
      </TouchableOpacity>
    );
  };

  const keyExtractor = (index) => {
    return index.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{padding:10}}>
        [INSERT FRIENDS/COMPLETED/ONGOING]
      </Text>
      <View style={styles.flatlist}>
        <FlatList
          data={Challenges}
          renderItem={renderChallenge}
          keyExtractor={(item, index) => keyExtractor(index)}
        />
      </View>

      <KeyboardAvoidingView
        style={styles.textinputrow}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => setText(text)}
          value={text}
        />
        {/* Temporary "add" button to create challenges */}
        <Ionicons.Button
          name="ios-add"
          size={24}
          color="white"
          backgroundColor='#2FDA77'
          borderRadius={100}
          onPress={() => addChallenge()}>
          Temp Add
        </Ionicons.Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1,
    width: '100%',
  },
  textinputrow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    paddingTop: 10,
    borderTopWidth :0.3,
    borderTopColor: '#555555',
    justifyContent: 'center'
    
  },
  textinput: {
    height: 40,
    textAlign: 'center',
    borderColor: 'gray',
    width: '60%',
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 100
  },
});
