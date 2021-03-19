import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Font,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const preLoadContent = () => {
  // const clearChallenges = async () => {
  //   AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
  // }
  // clearChallenges ();


  // Prologue
  let challenges = [];
  let posts = [];
  let post = {'user': 'Pablo',
               'content': 'Test Text only!',
                'pic': null
              };
  posts.push(JSON.stringify(post));
  post = {'user': 'Ange',
               'content': '',
                'pic':  Image.resolveAssetSource(require('../../assets/holder1.jpg')).uri
              };
  posts.push(JSON.stringify(post));

  post = {'user': 'Thunder',
               'content': 'Test Text and Image!',
                'pic': Image.resolveAssetSource(require('../../assets/holder2.jpg')).uri
              };
  posts.push(JSON.stringify(post));


  name = "Test Challenge!";
  details = "Random pics of my avatar in FFXIV";
  cover =  Image.resolveAssetSource(require('../../assets/holder0.png')).uri;
  obj = {
    name : "Test Challenge 1",
    details : "Random pics of my avatar in FFXIV",
    cover: Image.resolveAssetSource(require('../../assets/holder0.png')).uri,
    visibility: 0,
    checkpoint: 0,
    goal: -1,
    users: JSON.stringify(['Me', 'James']),
    checkins: JSON.stringify([[true, true],
                              [true, false]]),
    posts: JSON.stringify(posts)
  };
  challenges.push(obj);

  return challenges;

};
