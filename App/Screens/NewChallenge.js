import React, { useState, useEffect  } from 'react';
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
  Image,
} from 'react-native';
import Challenge from '../Components/Challenge.js';
import * as ImagePicker from 'expo-image-picker';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
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
        details : challengeDetails,
        cover: challengeIcon,
      };
      newChallenges.push(obj);
      setChallenges(newChallenges);
      navigation.navigate('Home');
  }
  };

  const [challengeIcon, setImage] = useState(null);
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

  _menu = null;
  const setMenuRef = ref => {
    _menu = ref;
  };
  const hideMenu = () => {
    _menu.hide();
  };
  const showMenu = () => {
    _menu.show();
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {challengeIcon && <Image source={{ uri: challengeIcon }} style={{ width: 150, height: 150 }} />}
        <Button title="Upload Image" onPress={pickImage} />
      </View>
      <TextInput
          style={styles.textinput}
          placeholder="Challenge Name"
          onChangeText={(challengeName) => setChallengeName(challengeName)}
          value={challengeName}
        />
      <TextInput
          style={styles.textinput}
          placeholder="Challenge Details"
          onChangeText={(challengeDetails) => setChallengeDetails(challengeDetails)}
          value={challengeDetails}
        />
      <View style={{ flexDirection:'row', justifyContent:'space-around' }}>
        <Menu
          style={styles.menu}
          ref={setMenuRef}
          button={<Text style={styles.option} onPress={showMenu}>Check-ins</Text>}
        >
          <MenuItem onPress={hideMenu}>None</MenuItem>
          <MenuDivider />
          <MenuItem onPress={hideMenu}>Everyday</MenuItem>
          <MenuDivider />
          <MenuItem onPress={hideMenu}>Everyweek</MenuItem>
        </Menu>
        <TextInput
            style={styles.option}
            placeholder="Goal Count"
          />
      </View>
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
  menu:{
    width: '50%',
    fontSize: 20,
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  container: {
    flex: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  textinput: {
    height: 40,
    textAlign: 'center',
    borderColor: 'gray',
    width: '50%',
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 100,
  },
  option: {
    height: 40,
    width: 80,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: 'gray',
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
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
