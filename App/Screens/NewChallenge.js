import React, { useState, useEffect } from 'react';
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
  Image,
  ScrollView,
  TouchableOpacity,
  CheckBox,
  Modal
} from 'react-native';
// import Challenge from '../Components/Challenge.js';
import { IconButton } from 'react-native-paper';

import { useFonts } from 'expo-font';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

//------------------------------------------------------
import DropDownPicker from 'react-native-dropdown-picker';

import Icon from 'react-native-vector-icons/Feather';
//------------------------------------------------------
import * as ImagePicker from 'expo-image-picker';
import CircleCheckBox from 'react-native-circle-checkbox';




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
  const [checkin, setCheckin] = useState(0);
  const [goalCount, setgoalCount] = useState(-1);
  const [challengeVisible, setchallengeVisible] = useState(0);
  const [linkVisible, setlinkVisible] = useState(false);
  // --------image picker--------
  const [challengeIcon, setImage] = useState("default");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const [challenges, setChallenges] = useState([]);
  const setChallengesFromStorage = (challenges_string) => {
    setChallenges(JSON.parse(challenges_string));
  }
  const readChallenges = async () => {
    try {
      const storage_challenges = await AsyncStorage.getItem('challenges');
      if (storage_challenges !== null) {
        setChallengesFromStorage(storage_challenges);
      }
    } catch (e) {
      console.error(e);
    }
  }
  const setStorage = async (newValue) => {
    try {
      await AsyncStorage.setItem('challenges', JSON.stringify(newValue) )
    } catch (e) {
      console.error(e)
    }
  };
  useEffect(() => {
    readChallenges();
  }, [challenges]);

  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }

  const createNewChallenge = async () => {
    if (challengeName != '' && challengeDetails != ''){
      let newChallenges = [...challenges];
      let obj = {
        name : challengeName,
        details : challengeDetails,
        cover: challengeIcon,
        visibility: challengeVisible,
        checkpoint: checkin,
        goal: goalCount
      };
      newChallenges.push(obj);
      setChallenges(newChallenges);
      setStorage(newChallenges);

      //Clearing fields
      setChallengeName('');
      setChallengeDetails('');
      setImage('default');
      navigation.navigate('Home');
    } else {
      alert('Challenge name and details cannot be empty');
      // setChecked(false);
    }
  };

  const getCheckinColor = () => {
    if (checkin === 0) {
      return '#555555';
    }
    return '#2FDA7f';
  }

  const getDefaultImage = () => {
    if (challengeIcon === "default"){
      return require('../../assets/logo.png');
    }
    return { uri: challengeIcon }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>

    <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical:20}}>
      {challengeIcon && <Image source={getDefaultImage()} style={styles.image} />}
      <Button title="Upload Image" onPress={pickImage} color='#2FDA7f' />
    </View>
      <View style={styles.labelalign}>
        <Text style={styles.label}> Name </Text>
      </View>
      <TextInput
          style={styles.textinput}
          onChangeText={(challengeName) => setChallengeName(challengeName)}
          value={challengeName}
          multiline = {true}
          placeholder={"Challenge name ..."}
      />
      <View style={styles.labelalign}>
        <Text style={styles.label}> Description </Text>
      </View>
      <TextInput
          style={styles.textinput}
          onChangeText={(challengeDetails) => setChallengeDetails(challengeDetails)}
          value={challengeDetails}
          multiline = {true}
          placeholder={"Challenge details ..."}
        />
        <View style={styles.labelalign}>
          <Text style={styles.label}> Tags </Text>
        </View>
      <TextInput
        style={styles.textinput}
        onChangeText={(tags) => setTags(tags)}
        value={tags}
        multiline = {true}
        placeholder={"Enter Tags ..."}
      />
      <View style={styles.labelalign}>
        <Icon.Button
          style={styles.label}
          name="link"
          color='#2FDA7f'
          backgroundColor="#fff"
          onPress={()=>setlinkVisible(true)}
        >
        <Text style={{fontFamily: 'Nunito', fontSize:16, color:'#2FDA7f'}}> Invite friends </Text>
        </Icon.Button>
      </View>
      <Modal
          transparent={true}
          visible={linkVisible}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <View
              style={{
                width: '75%',
                backgroundColor: 'white',
                padding: 15,
                alignItems: 'center',
                borderRadius: 10
              }}>
              <Text style={{fontSize:20, fontFamily: 'Nunito'}}>Invitation link is copied!</Text>
              <Button
                onPress={() => { setlinkVisible(false) }}
                title="Close"
              />
            </View>
          </View>
        </Modal>

      <View style={styles.options}>
        <Text style ={{color: '#555555'}}> Visibility: </Text>
        <CircleCheckBox
          outerColor='#2FDA7f'
          innerColor='#2FDA7f'
          checked={challengeVisible===1}
          onToggle={(checked) => setchallengeVisible(1)}
        />
        <Text style ={{color: '#555555'}}> Public </Text>
        <CircleCheckBox
          outerColor='#2FDA7f'
          innerColor='#2FDA7f'
          checked={challengeVisible===2}
          onToggle={(checked) => setchallengeVisible(2)}
        />
        <Text style ={{color: '#555555'}}> Friends </Text>
        <CircleCheckBox
          outerColor='#2FDA7f'
          innerColor='#2FDA7f'
          checked={challengeVisible===3}
          onToggle={(checked) => setchallengeVisible(3)}
        />
        <Text style ={{color: '#555555'}}> Private </Text>
      </View>
      <View style={styles.options}>
        <DropDownPicker
            items={[
                {label: 'Check-ins', value: 0},
                {label: 'Every day', value: 1},
                {label: 'Every week', value: 2},
                {label: 'Every month', value: 3},
            ]}
            selectedLabelStyle={{
              color: getCheckinColor()
          }}
            defaultValue={checkin}
            placeholder={'mksdmksdmk'}
            containerStyle={{height: '100%', width: '40%'}}
            style={styles.dropDown}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#white'}}
            onChangeItem={(item) => setCheckin(item.value)}
        />
        <IconButton
          icon="information"
          color={'lightgray'}
          size={20}
          onPress={() => {
            let info = "Check-in's indicate how frequently people in the challenge should post an update on their progress.";
            alert(info);
          }}
        />
        <TextInput
          keyboardType = 'numeric'
            onChangeText={(goalCount) => setgoalCount(goalCount)}
            value={goalCount}
            style={styles.goal}
            multiline = {false}
            placeholder={"Goal count"}
        />
        <IconButton
          icon="information"
          color={'lightgray'}
          size={20}
          onPress={() => {
            let info = "OPTIONAL: Goal count indicates how many total check-ins are required to complete a challenge.";
            alert(info);
          }}
        />
      </View>
      <View style={{paddingTop:100, paddingBottom:20}}>
      <TouchableOpacity style={styles.launch}
        onPress={(checked) => createNewChallenge()}
      >
      <Text style={{color: '#2FDA7f', fontSize:16}}>Launch Challenge</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  textinput: {
    flex: 0.15,
    fontSize: 20,
    height: 100,
    margin: 5,
    width: '90%',
    borderWidth: 1,
    color: '#555555',
    // fontFamily: 'Nunito',
    padding: 5,
    borderRadius: 5,
    borderColor: '#aaa'
  },
  dropDown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#aaa',
    color: '#555555'
  },
  label: {
    color:'#2FDA7f',
    fontSize: 15,
    paddingLeft: 14
  },
  labelalign:{
    alignItems:'flex-start',
    width:'100%'
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
  goal: {
    fontSize: 15,
    padding: 5,
    margin: 5,
    height: '100%',
    width: '40%',
    borderWidth: 1,
    borderColor: '#aaa',
    color: '#555555',
    fontFamily: 'Nunito',
    borderRadius: 5
  },
  image: {
    width: 120,
    height: 120,
    borderWidth:0.1,
    borderRadius:200,
  },
  options:{
    flexDirection:'row',
    height:40,
    width:'90%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop:0,
  },
  launch:{
    borderColor: '#2FDA7f',
    backgroundColor: '#fff',
    padding:10,
    borderRadius:100,
    borderWidth:1,
    margin:0
  }
  // picker: {
  // height: 50,
  // width: 150,
  // },

});
