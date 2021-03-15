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
} from 'react-native';
import Challenge from '../Components/Challenge.js';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Expand from 'react-native-simple-expand';
import Checkin from './Checkin.js'

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

  const scrollViewRef = useRef();
  return (
    <SafeAreaView style={styles.container}>
      <View style= {styles.container_title}>
        <Image
          source= {{ uri: challengeIcon }}
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
        <ScrollView style={styles.checkin} directionalLockEnabled='true' ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
                    >
          <Checkin/>
          <Expand value={expandCheckin}>
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
    flexDirection: "column",
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
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
    width: 80,
    height: 80,
    borderRadius: 80,
    borderColor: "#555555",
    borderWidth: 1
  }
});
