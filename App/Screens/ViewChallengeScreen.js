import React, { useState, useEffect, useRef  } from 'react';
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
  Image,
  TouchableHighlight,
  Animated,
  ScrollView,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Expand from 'react-native-simple-expand';
import Checkin from './Checkin.js'
import PostList from '../Components/PostList.js'

export default function App({ navigation, route }) {
  const [checked, setChecked] = useState(false);

  const {challengeIcon, challengeName, challengeDetails, deleteChallenge, index} = route.params;

  // fake variables for formatting
  const checkpoint = 1
  const goalCount = 2

  const deleteAndGoToList = async () => {
    await deleteChallenge(index);
    navigation.navigate('Home');
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, [])

  const [expandTitle, setexpandTitle] = useState(false);
  const [expandButton, setexpandButton] = useState("chevron-down");

  const [expandCheckin, setexpandCheckin] = useState(false);
  const [expandButton2, setexpandButton2] = useState("chevron-down");

  const expandButtonPressed = async () => {
    setexpandTitle(!expandTitle);
    setexpandButton( (expandButton==="chevron-down") ? "chevron-up" : "chevron-down" );
  }

  const expandButtonPressed2 = async () => {
    setexpandCheckin(!expandCheckin);
    setexpandButton2( (expandButton2==="chevron-down") ? "chevron-up" : "chevron-down" );
  }

  const getIconUgly = () => {
    switch(challengeIcon) {
        case "default":
          return require('../../assets/logo.png');
          break;
        case "1":
            return require('../../assets/1.png');
            break;
        case "2":
            return require('../../assets/2.png');
            break;
        case "3":
            return require('../../assets/3.png');
            break;
        default:
          return { uri: challengeIcon };
      }
  }

  const scrollViewRef = useRef();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.container2}>
      <View style= {styles.container_title}>
        <Image
          source= {getIconUgly()}
          style = {styles.iconPicture}
        />
        <View style = {{flexDirection: 'row', alignItems:'center'}}>
          <Text style={styles.text_title}>{challengeName}</Text>
          <Icon.Button
            name={expandButton}
            size='30'
            color='#2FDA7f'
            backgroundColor="#fff"
            onPress={expandButtonPressed}
          />
        </View>
        <Expand value={expandTitle}>
          <Text style={styles.text_body}>About: {challengeDetails}</Text>
        </Expand>
      </View>
      <View style={styles.container_checkin}>
        <View style={styles.users}>
          <Text style={styles.user_text}> ME </Text>
          <Expand value={expandCheckin}>
            <Text style={styles.user_text}> Pablo </Text>
            <Text style={styles.user_text}> Ange </Text>
          </Expand>
        </View>
        <ScrollView
          style={styles.checkin}
          directionalLockEnabled='true'
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: false})}
          nestedScrollEnabled={true}
          >
          <Checkin/>
          <Expand value={expandCheckin} >
            <Checkin/>
            <Checkin/>
          </Expand>
        </ScrollView>
        <Icon.Button
          name={expandButton2}
          size='30'
          color='#2FDA7f'
          backgroundColor="#fff"
          onPress={expandButtonPressed2}
        />
      </View>
      <PostList/>
      <BouncyCheckbox
        checked
        textColor="#000"
        fillColor="red"
        text={'Delete'}
        onPress={(checked) => deleteAndGoToList()}
      />
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: 'flex-start',
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container_title:{
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingTop: 20
  },
  container_checkin:{
    width: '90%',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-start',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  checkin:{
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingBottom: 10
  },
  users:{
    flexDirection:'column',
    width: '20%',
    alignItems: 'center',
    justifyContent:'flex-start'
  },
  user_text:{
    fontSize: 16,
    fontFamily: 'Nunito',
    paddingTop: 25,
    paddingBottom: 15,
  },
  text_title: {
    fontSize: 20,
    fontFamily: 'Nunito',
    textAlign: 'center',
    paddingLeft: 25
  },
  text_body: {
    fontSize: 20,
    fontFamily: 'Nunito',
    textAlign: 'center',
    paddingBottom: 10
  },
  iconPicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#555555",
    borderWidth:0.1
  }
});
