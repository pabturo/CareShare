import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation}) {
  // const clearChallenges = async () => {
  //   AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
  // }
  const setStorage = async (newValue) => {
    try {
      await AsyncStorage.setItem('challenges', JSON.stringify(newValue) )
    } catch (e) {
      console.error(e)
    }
  };
  //clearChallenges ();

  //preLoadContent();

  const [challenges, setChallenges] = useState([]);
  //setStorage(challenges);

  const [text, setText] = useState('');
  const delay = (time) => new Promise((response) => setTimeout(response, time));

  const deleteChallenge = async (index, key) => {
    let newChallenges = [...challenges];
    newChallenges.splice(index, 1);
    // try {
    //     await AsyncStorage.removeItem(key);
    // }
    // catch(exception) {}
    await delay(100);
    setChallenges(newChallenges);
    setStorage(newChallenges);
  };

  const goNewChallenge = () => {
    navigation.navigate('New Challenge',{challenges, setChallenges})
  };

  const renderChallenge = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('View Challenge', {
            name : item.name,
            details : item.details,
            cover: item.cover,
            visibility: item.visibility,
            checkpoint: item.checkpoint,
            goal: item.goal,
            users: item.users,
            checkins: item.checkins,
            posts: item.posts,
            deleteChallenge: deleteChallenge,
            index: index,
          })
        }>
        <Challenge challengeName={item.name} challengeIcon={item.cover} challengeDetails = {item.details}/>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (index) => {
    return index.toString();
  };

  // const getAsyncChallenges = async () => {
  //   try {
  //     const list = await AsyncStorage.getItem('challenges');
  //     if (list !== null) {
  //       // We have data!!
  //       console.log("We have data! " + list);
  //       let dummyList = [...list];
  //       await AsyncStorage.clear();
  //       console.log("Data cleared");
  //       return dummyList;
  //     } else {
  //       console.log("No data...")
  //       let dummyList = [];
  //       await AsyncStorage.setItem('challenges',dummyList);
  //       return dummyList;
  //     }
  //   } catch (error) {
  //     console.log("Error while retrieving data");
  //     return [];
  //   }
  // };

  //
  // const addChallenge = async () => {
  //   // Deep copy of array avoids any state mutation instead of state update rerender issues
  //
  //   if (text != '') {
  //     let newChallenges = [...challenges];
  //     let obj = {
  //       name : text,
  //       details : "Default"
  //     };
  //     newChallenges.push(obj);
  //     // setChallenges(newChallenges);
  //     setText('');
  //     setStorage(newChallenges);
  //   }
  // };

  const setChallengesFromStorage = (challenges_string) => {
    setChallenges(JSON.parse(challenges_string));
  };

  const readChallenges = async () => {
    try {
      const storage_challenges = await AsyncStorage.getItem('challenges');
      if (storage_challenges !== null) {
        setChallengesFromStorage(storage_challenges);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    readChallenges();
  }, [challenges]);



  return (
    <SafeAreaView style={styles.container}>
      <View style={{
                // backgroundColor: 'red',
                paddingTop: 10,
                marginBottom: 2,
                borderColor: '#555555',
                borderBottomWidth: 0.5,
              }}>
        <Text style ={{color: '#555555', fontSize: 18}}>My Challenges</Text>
      </View>

      {/* List of Challenges */}
      <View style={styles.flatlist}>
        <FlatList
          data={challenges}
          renderItem={renderChallenge}
          keyExtractor={(item, index) => keyExtractor(index)}
        />
      </View>

      {/* <KeyboardAvoidingView
        style={styles.textinputrow}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <TextInput
          style={styles.textinput}
          onChangeText={(text) => setText(text)}
          value={text}
        />
        <Button
          title='Create'
          onPress={() => addChallenge()}
          >
          Temp Add
        </Button>

        <Button
          title='+'
          onPress={() => goNewChallenge()}
          >
        </Button>
      </KeyboardAvoidingView> */}
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
    width: '35%',
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 100
  },
});
