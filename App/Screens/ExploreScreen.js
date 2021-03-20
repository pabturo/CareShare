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
  Image
} from 'react-native';

import ExploreChallenge from '../Components/ExploreChallenge.js';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App({ navigation}) {
    const [search, setSearch] = useState('')
    const [challenges, setChallenges] = useState([
        {
            name : "RUN RUN RUN!!!!",
            details : "Run every day for a month.",
            cover: Image.resolveAssetSource(require('../../assets/1.png')).uri,
        },
        {
            name: "Love Cooking",
            details : "Cook a fancy dinner with a loved one.",
            cover: Image.resolveAssetSource(require('../../assets/2.png')).uri,
        },
        {
            name: "Baking Fun!",
            details : "Bake a muffin.",
            cover: Image.resolveAssetSource(require('../../assets/3.png')).uri,
        },
    ]);
  const [text, setText] = useState('');

  const delay = (time) => new Promise((response) => setTimeout(response, time));

  const deleteChallenge = async (index) => {
    await delay(100);
    let newChallenges = [...challenges];
    newChallenges.splice(index, 1);
    setChallenges(newChallenges);
    setStorage(newChallenges);
  };

//   const goNewChallenge = () => {
//     navigation.navigate('New Challenge',{challenges, setChallenges})
//   };

  const renderChallenge = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
        //   navigation.navigate('View Challenge', {
        //     challengeIcon: item.cover,
        //     challengeName: item.name,
        //     challengeDetails: item.details,
        //     deleteChallenge: deleteChallenge,
        //     index: index,
        //   })
          navigation.navigate('New Explore Challenge', {
              name: item.name,
              details: item.details,
              icon: item.cover
          })
            // {console.log("Clicked explore challenge");}
        }>
        <ExploreChallenge
            challengeName={item.name}
            challengeDetails={item.details}
            challengeIcon={item.cover} />
      </TouchableOpacity>
    );
  };

  const keyExtractor = (index) => {
    return index.toString();
  };

//   const clearChallenges = async () => {
//     AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
//   }
//   const addChallenge = async () => {
//     // Deep copy of array avoids any state mutation instead of state update rerender issues

//     if (text != '') {
//       let newChallenges = [...challenges];
//       let obj = {
//         name : text,
//         details : "Default"
//       };
//       newChallenges.push(obj);
//       // setChallenges(newChallenges);
//       setText('');
//       setStorage(newChallenges);
//     }
//   };

//   const setChallengesFromStorage = (challenges_string) => {
//     setChallenges(JSON.parse(challenges_string));
//   };

//   const readChallenges = async () => {
//     try {
//       const storage_challenges = await AsyncStorage.getItem('challenges');
//       if (storage_challenges !== null) {
//         setChallengesFromStorage(storage_challenges);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     readChallenges();
//   }, [challenges]);

//   const setStorage = async (newValue) => {
//     try {
//       await AsyncStorage.setItem('challenges', JSON.stringify(newValue) )
//     } catch (e) {
//       console.error(e)
//     }
//   };


  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{
                width: '30%',
                // backgroundColor: 'red',
                paddingTop: 10,
                marginBottom: 2,
                borderColor: '#555555',
                borderBottomWidth: 0.5,
                alignItems: 'center',

              }}>
        <Text style={{color: '#555555'}}>Explore Challenges</Text>
      </View> */}
      <TextInput
          style={styles.textinput}
          onChangeText={(search) => setSearch(search)}
          value={search}
          placeholder={"🔍 Search new challenges"}
      />
      {/* List of Challenges */}
      <View style={styles.flatlist}>
        <FlatList
          data={challenges}
          renderItem={renderChallenge}
          keyExtractor={(item, index) => keyExtractor(index)}
        />
      </View>
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
    fontSize: 20,
    height: '7%',
    margin: 5,
    width: '75%',
    borderWidth: 1,
    color: '#555555',
    // fontFamily: 'Nunito',
    padding: 10,
    borderRadius: 100,
    borderColor: '#aaa',
    color: '#555555',
  },
});
