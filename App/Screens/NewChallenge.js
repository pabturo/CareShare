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

import { useFonts } from 'expo-font';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Picker} from '@react-native-picker/picker';

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
  const [country, setCountry] = useState(0);
  const [goalCount, setgoalCount] = useState(-1);
  // --------image picker--------
  const [challengeIcon, setImage] = useState("../../assets/book.png");
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

  // ----------------------------
  const [challengeVisible, setchallengeVisible] = useState(0);
  const [linkVisible, setlinkVisible] = useState(false);
  // ----------------------------

  const {challenges, setChallenges} = route.params;


  const createNewChallenge = async () => {
    // await deleteChallenge(index);
    if (challengeName != '' && challengeDetails != ''){
      let newChallenges = [...challenges];
      let obj = {
        name : challengeName,
        details : challengeDetails,
        cover: challengeIcon,
        visibility: challengeVisible,
        checkpoint: country,
        goal: goalCount
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
    <ScrollView contentContainerStyle={styles.container}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom:20}}>
      {challengeIcon && <Image source={{ uri: challengeIcon }} style={styles.image} />}
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
        <Text> Visibility: </Text>
        <CircleCheckBox
          outerColor='#2FDA7f'
          innerColor='#2FDA7f'
          checked={challengeVisible===1}
          onToggle={(checked) => setchallengeVisible(1)}
        />
        <Text> Public </Text>
        <CircleCheckBox
          outerColor='#2FDA7f'
          innerColor='#2FDA7f'
          checked={challengeVisible===2}
          onToggle={(checked) => setchallengeVisible(2)}
        />
        <Text> Friends </Text>
        <CircleCheckBox
          outerColor='#2FDA7f'
          innerColor='#2FDA7f'
          checked={challengeVisible===3}
          onToggle={(checked) => setchallengeVisible(3)}
        />
        <Text> Private </Text>
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
              color: '#39739d'
          }}
            defaultValue={country}
            placeholder={'mksdmksdmk'}
            containerStyle={{height: '100%', width: '50%'}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(item) => setCountry(item.value)}
        />
        <TextInput
          keyboardType = 'numeric'
            onChangeText={(goalCount) => setgoalCount(goalCount)}
            value={goalCount}
            style={styles.goal}
            multiline = {false}
            placeholder={"Set goal (optional)"}
        />
      </View>
      <View style={{paddingTop:100, paddingBottom:20}}>
      <TouchableOpacity style={styles.launch}
        onPress={(checked) => createNewChallenge()}
      >
      <Text style={{color: '#2FDA7f', fontSize:20}}>Launch Challenge</Text>
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
    fontFamily: 'Nunito',
    padding: 5,
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
    width: '50%',
    borderWidth: 1,
    borderColor: '#aaa',
    color: '#555555',
    fontFamily: 'Nunito',
    borderRadius: 5
  },
  image: {
    width: 150,
    height: 150,
    borderWidth:1
  },
  options:{
    flexDirection:'row',
    height:50,
    width:'90%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop:0
  },
  launch:{
    borderColor: '#2FDA7f',
    backgroundColor: '#fff',
    padding:10,
    borderRadius:100,
    borderWidth:1,
    margin:20
  }
  // picker: {
  // height: 50,
  // width: 150,
  // },

});
