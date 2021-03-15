import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  // Picker,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import Challenge from '../Components/Challenge.js';

import { useFonts } from 'expo-font';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Picker} from '@react-native-picker/picker';

//------------------------------------------------------
import DropDownPicker from 'react-native-dropdown-picker';

import Icon from 'react-native-vector-icons/Feather';
//------------------------------------------------------





export default function App({ navigation, route }) {
  const [loaded, error] = useFonts({ 
    Nunito: require('../Assets/Nunito-Regular.ttf'),
    NunitoBold: require('../Assets/Nunito-Bold.ttf')
  });

  const [checked, setChecked] = useState(false);
  const [challengeName, setChallengeName] = useState('');
  const [challengeDetails, setChallengeDetails] = useState('');
  const [tags, setTags] = useState('');
  // ----------------------------
  const [country, setCountry] = useState("Every day");
  

  // ----------------------------

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
    } else {
      alert('Challenge name and details cannot be empty');
      setChecked(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
          style={styles.textinput}
          onChangeText={(challengeName) => setChallengeName(challengeName)}
          value={challengeName}
          multiline = {true}
          placeholder={"Challenge name ..."}
        />
      <TextInput
          style={styles.textinput}
          onChangeText={(challengeDetails) => setChallengeDetails(challengeDetails)}
          value={challengeDetails}
          multiline = {true}
          placeholder={"Challenge details ..."}
        />
      <TextInput
        style={styles.tags}
        onChangeText={(tags) => setTags(tags)}
        value={tags}
        multiline = {true}
        placeholder={"Enter Tags ..."}
      />
      <DropDownPicker
          items={[
              {label: 'Every day', value: 'Every day'},
              {label: 'Every week', value: 'Every week'},
              {label: 'Every month', value: 'Every month'},
          ]}
          selectedLabelStyle={{
            color: '#39739d'
        }}
          defaultValue={country}
          placeholder={'mksdmksdmk'}
          containerStyle={{height: 40, width: 200}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setCountry(item.value)}
      />
        
        
      <View styles={{position: 'absolute',
          bottom: 0}}>
      <Button
        textColor="#000"
        title='Launch Challenge'
        onPress={(checked) => createNewChallenge()}
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
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  textinput: {
    flex: 0.15,
    fontSize: 20,
    height: 100,
    margin: 5,
    width: '90%',
    borderWidth: 1,
    color: '#555555',
    fontFamily: 'Nunito',
  },
  tags: {
    fontSize: 20,
    height: 40,
    margin: 5,
    width: '90%',
    borderWidth: 1,
    color: '#555555',
    fontFamily: 'Nunito',
  },
});