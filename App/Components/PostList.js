import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Post from '../Components/Post.js'

export default function PostList(props) {
  //const { challengeIcon, challengeName } = props;
  return (
    <View style={styles.container}>
      <Post/>
      <Post/>
      <Post/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
});
