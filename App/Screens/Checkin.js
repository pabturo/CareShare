import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Checkin(props) {
  //const { challengeIcon, challengeName } = props;

  const option=0;
  const history = [true, true, false, true, false, true, false, true, true, true]
  var myList = [];
  for (let i = 0; i < history.length; i++){
    myList.push(
      <View style={styles.checkpoint}>
        <Text style={styles.line} textColor={'#00000'}>─</Text>
      </View>
    )
    if (history[i]){
      myList.push(
        <View style={{paddingTop:0, alignItems:'center'}}>
          <Text style={styles.text}>Day {i}</Text>
          <Icon name="check" size={30} color={'#2FDA7f'} style={styles.check_on}/>
        </View>
      )
    } else {
      myList.push(
        <View style={styles.checkpoint}>
          <Text style={styles.text}>Day {i}</Text>
          <Text style={styles.check_off}/>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      {myList}
      <View style={{width:'45%'}}/>
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center'
  },
  checkpoint:{
    flexDirection: 'column',
    alignItems: 'center'
  },
  text:{
    fontSize: 16,
    paddingTop: 10,
    fontFamily: 'Nunito'
  },
  check_on:{
    height:30,
    width:30,
    borderRadius:15,
    borderWidth:2,
    borderColor:'#2FDA7f',
  },
  check_off:{
    height:30,
    width:30,
    borderRadius:15,
    borderWidth:2,
    borderColor:'#999999',
  },
  line:{
    fontSize: 16,
    paddingTop: 30,
    fontFamily: 'Nunito'
  }
});
