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
  Modal,
  Dimensions,
  CheckBox
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Expand from 'react-native-simple-expand';
import Checkin from './Checkin.js'
import Post from '../Components/Post.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function App({ navigation, route }) {

  // View Components
  const keyExtractor = (index) => {
    return index.toString();
  };
  const [postView, setPostView] = useState(false);
  const [checked, setChecked] = useState(false);
  const [newCheckin, setNewCheckin] = useState(false);
  const deleteAndGoToList = async () => {
    await deleteChallenge(index, name);
    navigation.navigate('Home');
  };
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
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

  // Information to show
  const {name, details, cover, visibility, checkpoint, goal, users, checkins, posts, deleteChallenge, index} = route.params;
  const parsedUsers = JSON.parse(users);
  const parsedCheckins = JSON.parse(checkins);
  const [parsedPost, setParsedPost] = useState(JSON.parse(posts));
  //const [parsedCheckins, setParsedCheckins] = useState(JSON.parse(posts));

  // Make new post
  const [newPostText, setNewPostText] = useState("");
  const defaultImage = Image.resolveAssetSource(require('../../assets/logo.png')).uri
  const [postImage, setImage] = useState(defaultImage);
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

  const makeCheckin = () =>{
    return;

  };

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
  const addPost = () => {
    if (newPostText != ''){
      if (postImage == defaultImage){
        setImage(null);

      }
      let post = {'user': 'Me',
                   'content': newPostText,
                    'pic': postImage == defaultImage ? null : postImage,
                  };
      let newPosts = [...parsedPost];
      newPosts.unshift(JSON.stringify(post));
      setParsedPost(newPosts);
      if (newCheckin)
        makeCheckin();

      setNewPostText('');
      setImage(defaultImage);
      setPostView(false);
      setNewCheckin(false);
  }


  // const [challengeInfo, setChallengeInfo] = useState([]);
  // const setChallengesFromStorage = (challenges_string) => {
  //   setChallengeInfo(JSON.parse(challenges_string));
  // }
  // const readChallengeInfo = async () => {
  //   try {
  //     //const storage_challenges = await AsyncStorage.getItem({challengeName});
  //     const storage_challenges = await AsyncStorage.getItem(challengeName);
  //     if (storage_challenges !== null) {
  //       setChallengesFromStorage(storage_challenges);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
  // const setStorage = async (newValue) => {
  //   try {
  //     await AsyncStorage.setItem(challengeName, JSON.stringify(newValue) )
  //   } catch (e) {
  //     console.error(e)
  //   }
  // };
};


  const scrollViewRef = useRef();
  return (
    <View>
    <ScrollView style={styles.container} contentContainerStyle={styles.container2}>
      <View style= {styles.container_title}>
        <Image
          source= {{uri: cover}}
          style = {styles.iconPicture}
        />
        <View style = {{flexDirection: 'row', alignItems:'center'}}>
          <Text style={styles.text_title}>{name}</Text>
          <Icon.Button
            name={expandButton}
            size='30'
            color='#2FDA7f'
            backgroundColor="#fff"
            onPress={expandButtonPressed}
          />
        </View>
        <Expand value={expandTitle}>
          <Text style={styles.text_body}>{details}</Text>
        </Expand>
      </View>
      <View style={styles.container_checkin}>
        <View style={styles.users}>
          <Text style={styles.user_text}> {parsedUsers[0]} </Text>
          <Expand value={expandCheckin}>
            <FlatList
              data={parsedUsers.splice(1)}
              renderItem={({index, item}) => {return (<Text style={styles.user_text}> {item} </Text>);}}
              keyExtractor={(index, item) => keyExtractor(index)}
            />
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
          <Checkin history={parsedCheckins[0]} checkpoint={checkpoint} goal={goal}/>
          <Expand value={expandCheckin} >
            <FlatList
              data={parsedCheckins.splice(1)}
              renderItem={({index, item}) => {return (<Checkin history={item} checkpoint={checkpoint} goal={goal}/>);}}
              keyExtractor={(index, item) => keyExtractor(index)}
            />
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
      <View style={styles.container}>
        <FlatList
          data={parsedPost}
          renderItem={({index, item}) => {return (<Post postContent={item}/>);}}
          keyExtractor={(index, item) => keyExtractor(index)}
        />
      </View>
      <BouncyCheckbox
        checked
        textColor="#000"
        fillColor="red"
        text={'Delete'}
        onPress={(checked) => deleteAndGoToList()}
      />
    </ScrollView>
    <View style={styles.new}>
      <Icon.Button
        name="plus"
        size='50'
        borderRadius='100'
        borderColor = '#2FDA7f'
        borderWidth = '1.3'
        color='#2FDA7f'
        backgroundColor='white'
        onPress={() => setPostView(true)}
      />
    </View>
    <Modal
        transparent={true}
        visible={postView}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            paddingVertical: 200,
            backgroundColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ScrollView
            scrollEnabled='false'
            style={{
              backgroundColor: 'white',
              padding: 15,
              borderRadius: 10
            }}>
            <Text style={{fontSize:20, 
              // fontFamily: 'Nunito'
              }}>New Post</Text>
            <View style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical:5}}>
              {postImage && <Image source={{ uri: postImage }} style={styles.image} />}
              <Button title="Upload Image" onPress={pickImage} color='#2FDA7f' />
            </View>
            <TextInput
                style={styles.textinput}
                onChangeText={(newPostText) => setNewPostText(newPostText)}
                value={newPostText}
                multiline = {true}
                placeholder={"Track your moments..."}
            />
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Button
                onPress={addPost}
                title="Post"
                color='#2FDA7f'
              />
              <Button
                onPress={() => setPostView(false)}
                title="Cancel"
                color='#2FDA7f'
              />
              <BouncyCheckbox
                // newCheckin
                textColor="#000"
                fillColor="#2FDA7f"
                borderColor="#555555"
                text={'Check in?'}
                onPress={() => setNewCheckin(!newCheckin)}
              />
              <View style={{'width':50, 'height':50}}>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: 'flex-start',
    width: '100%',
    height: '100%',
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
    alignItems:'flex-start',
    justifyContent:'flex-start',
    alignSelf:'flex-start'
  },
  user_text:{
    fontSize: 16,
    fontFamily: 'Nunito',
    paddingTop: 25,
    paddingBottom: 15,
  },
  text_title: {
    fontSize: 25,
    fontFamily: 'Nunito',
    textAlign: 'center',
    paddingLeft: 25
  },
  text_body: {
    fontSize: 18,
    // fontFamily: 'Nunito',
    textAlign: 'center',
    paddingBottom: 10
  },
  iconPicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#555555",
    borderWidth:0.1
  },
  post:{
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  new:{
    position: 'absolute',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 50,
    borderRadius: 50,
    borderColor:'#2FDA7f',
    borderWidth: 5
  },
  textinput:{
    fontSize: 20,
    height: 150,
    width: 300,
    borderWidth: 1,
    color: '#555555',
    padding: 10,
    borderRadius: 3,
    borderColor: '#aaa'
  },
  image:{
    height:120,
    width:'90%'
  }
});
