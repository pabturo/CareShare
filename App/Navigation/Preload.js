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
  let post = {'user': 'Me',
               'content': 'Text only!',
                'pic': null
              };
  posts.push(JSON.stringify(post));
  post = {'user': 'Ange',
               'content': '',
                'pic':  Image.resolveAssetSource(require('../../assets/holder1.jpg')).uri
              };
  posts.push(JSON.stringify(post));

  post = {'user': 'Thunder',
               'content': 'Text and Image!',
                'pic': Image.resolveAssetSource(require('../../assets/holder2.jpg')).uri
              };
  posts.push(JSON.stringify(post));

  let obj = {
    name : "CS 147 Book Club 📚",
    details : "Read 3 design books!",
    cover: Image.resolveAssetSource(require('../../assets/read.jpeg')).uri,
    visibility: 0,
    checkpoint: 0,
    goal: 3,
    users: JSON.stringify(['Me', 'Tzu-Sheng']),
    checkins: JSON.stringify([[true, true, false],
                              [true, false, true]]),
    posts: JSON.stringify(posts)
  };
  challenges.push(obj);

  let obj2 = {
    name : "Guitar Bootcamp 🎶",
    details : "Learn how to play 5 songs",
    cover: Image.resolveAssetSource(require('../../assets/guitar.jpeg')).uri,
    visibility: 0,
    checkpoint: 0,
    goal: 5,
    users: JSON.stringify(['Me', 'Ange', 'Thunder']),
    checkins: JSON.stringify([[false, true, false, true, true],
                              [true, true, true, true, false],
                              [false, true, true, true, false]]),
    posts: JSON.stringify(posts)
  };
  challenges.push(obj2);


  let obj3 = {
    name : "10-day Squat Challenge 😤",
    details : "Work up to 100 squats a day!",
    cover: Image.resolveAssetSource(require('../../assets/squat.jpeg')).uri,
    visibility: 0,
    checkpoint: 0,
    goal: 10,
    users: JSON.stringify(['Me', 'Eunice', 'Erica', 'Clara', 'Tyler']),
    checkins: JSON.stringify([[false, true],
                              [true, true],
                              [true, true],
                              [true, false],
                              [false, false]]),
    posts: JSON.stringify(posts)
  };
  challenges.push(obj3);

  let obj4 = {
    name : "Knit Challenge🧶",
    details : "Knit mom a sweater :3",
    cover: Image.resolveAssetSource(require('../../assets/knit.jpeg')).uri,
    visibility: 0,
    checkpoint: 0,
    goal: -1,
    users: JSON.stringify(['Me']),
    checkins: JSON.stringify([[true, true, false, true, false]]),
    posts: JSON.stringify(posts)
  };
  challenges.push(obj4);


  return challenges;

};
