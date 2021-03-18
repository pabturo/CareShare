import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Post(props) {
  //const { challengeIcon, challengeName } = props;
  const profilePic = require('../../assets/logo.png');
  const userName = "UserName";
  const postText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel blandit justo, id feugiat mauris. Mauris venenatis enim sit amet eros hendrerit, malesuada volutpat sapien vestibulum.";
  const postPic = require('../../assets/logo.png');

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image  source= {profilePic}  style = {styles.userPic}  />
        <Text style={styles.userName}> {userName} </Text>
      </View>
      <Text style={styles.text}> {postText} </Text>

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
});
