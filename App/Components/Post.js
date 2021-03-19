import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Post(props) {
  //const { challengeIcon, challengeName } = props;
  const info = JSON.parse(props.postContent);
  const profilePic = require('../../assets/logo.png');
  const userName = info['user'];
  const postText = info['content'];
  const postPic = info['pic'];
  if (!postText)
    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image source= {profilePic}  style = {styles.userPic}  />
          <Text style={styles.userName}> {userName} </Text>
        </View>
        <Image source={{ uri: postPic }} style={styles.image} />
      </View>
    );
  else if (!postPic)
    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image source= {profilePic}  style = {styles.userPic}  />
          <Text style={styles.userName}> {userName} </Text>
        </View>
        <Text style={styles.text}> {postText} </Text>
      </View>
    );
  else
    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image source= {profilePic}  style = {styles.userPic}  />
          <Text style={styles.userName}> {userName} </Text>
        </View>
        <Text style={styles.text}> {postText} </Text>
        <Image source={{ uri: postPic }} style={styles.image} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {  alignItems: 'flex-start',
                alignSelf: 'flex-start',
                paddingVertical: 10,
                width: '100%',
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
  userInfo: { flexDirection: 'row',
              alignItems: 'center'
              },
  userPic: {width: 50,
            height: 50,
            borderRadius: 50,
            borderColor: "#555555",
            borderWidth:0.1},
  userName:{
    fontSize: 16,
    margin: 10,
    fontFamily: 'NunitoSemiBold'
  },
  text:{
    fontSize: 16,
    padding: 10,
    width: '100%',
    fontFamily: 'Nunito'
  },
  image:{
    height:200,
    width: '100%',
  }
});
