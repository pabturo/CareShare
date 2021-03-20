import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useFonts } from 'expo-font';

export default function Challenge(props) {
  const [checked, setChecked] = useState(false);

  const [loaded, error] = useFonts({
    Nunito: require('../Assets/Nunito-Regular.ttf'),
    NunitoBold: require('../Assets/Nunito-Bold.ttf')
  });
  const {challengeIcon, challengeDetails, challengeName } = props;

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

  return (
    <View style={styles.Challenge}>
        <Image 
          source={getIconUgly()}
          style={styles.iconPicture} 
        />
        <View style={styles.groupText}>
          <Text style={styles.challengeName}>{challengeName}</Text>
          <Text style={styles.checkInStatus}>{challengeDetails}</Text>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  Challenge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth :0.3,
    borderBottomColor: '#E7E7E7',
    padding: 8,
    paddingHorizontal: 20,
  },
  groupText: {
    flexDirection: 'column',
    paddingLeft: 16,
    width: '80%'
  },
  challengeName: {
    fontFamily:'NunitoBold',
    fontSize: 20,
    color: '#555555',
  },
  checkInStatus: {
    // fontFamily:'Nunito',
    fontSize: 18,
    color: '#555555',
  },
  iconPicture: {
    width: 75,
    height: 75,
    borderRadius: 100
  },
});