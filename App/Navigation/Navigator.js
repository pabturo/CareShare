import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ViewChallenge from '../Screens/ViewChallengeScreen';
import NewChallenge from '../Screens/NewChallenge';
import ListScreen from '../Screens/ListScreen';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

export default function Navigator() {
  const [loaded, error] = useFonts({
    Montserrat: require('../Assets/Montserrat.ttf'),
    Nunito: require('../Assets/Nunito-Regular.ttf'),
    NunitoSemiBold: require('../Assets/Nunito-SemiBold.ttf')
  });

  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Home"
          component={ListScreen}
          options={{
            headerTitle: () => <Text style={styles.title}>CareShare</Text>,
          }}
        />
        <Stack.Screen
          name="View Challenge"
          component={ViewChallenge}
        />
        <Stack.Screen
          name="New Challenge"
          component={NewChallenge}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontFamily: 'NunitoSemiBold',
    paddingBottom: 56,
    textAlign: 'center',
    color: '#2FDA77',
    letterSpacing: -2,

  },
});
