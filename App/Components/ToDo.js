import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useFonts } from 'expo-font';

export default function ToDo(props) {
  const [checked, setChecked] = useState(false);

  const [loaded, error] = useFonts({ 
    Nunito: require('../Assets/Nunito-Regular.ttf'),
    NunitoBold: require('../Assets/Nunito-Bold.ttf')
  });
  
  const { text, deleteToDo } = props;

  return (
    <View style={styles.todo}>

        <Image 
          source={require('../../assets/book.png')}  
          style={styles.iconPicture} 
        />
        <View style={styles.groupText}>
          <Text style={styles.groupTitle}>{text}</Text>
          <Text style={styles.groupSubtitle}>{'Make sure to check in!'}</Text>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    // backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth :0.3,
    borderBottomColor: '#E7E7E7',
    padding: 8,
    paddingLeft: 16,
  },
  groupText: {
    flexDirection: 'column', 
    paddingLeft: 16,
    width: '80%'
  },
  groupTitle: {
    fontFamily:'NunitoBold',
    fontSize: 20,
    color: '#555555',
  },
  groupSubtitle: {
    fontFamily:'Nunito',
    fontSize: 18,
    color: '#555555',
  },
  iconPicture: {
    width: 75, 
    height: 75, 
    borderRadius: 100
  },
});
