import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Font
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ViewChallenge from '../Screens/ViewChallengeScreen';
import NewChallenge from '../Screens/NewChallenge';
import NewExploreChallenge from '../Screens/NewExploreChallenge';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {preLoadContent } from "./Preload";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ExploreStack = createStackNavigator();
const NewChallengeStack = createStackNavigator();


export default function Navigator() {
  // const clearChallenges = async () => {
  //   AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
  // }
  // clearChallenges();
  const preloadStorage = async (newValue) => {
    try {
      const storage_challenges = await AsyncStorage.getItem('challenges');
      if (storage_challenges === null || storage_challenges === '[]')
        try {
          await AsyncStorage.setItem('challenges', JSON.stringify(newValue) )
        } catch (e) {
          console.error(e)
        }
    } catch (e) {
      console.error(e);
    }
  };

  // clearChallenges();
  const challenges = preLoadContent();
  preloadStorage(challenges);

  const [loaded, error] = useFonts({
    Nunito: require('../Assets/Nunito-Regular.ttf'),
    NunitoSemiBold: require('../Assets/Nunito-SemiBold.ttf'),
    NunitoBold: require('../Assets/Nunito-Bold.ttf'),
  });

  function ExploreStackScreen() {
    return (
      <ExploreStack.Navigator mode="modal">
        <ExploreStack.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            headerTitle: () => <Text style={styles.title}>CareShare</Text>,
          }}
        />
        <ExploreStack.Screen
          name="New Explore Challenge"
          component={NewExploreChallenge}
          options={{
            headerTitle: () => <Text style={styles.title}>CareShare</Text>,
          }}
        />
      </ExploreStack.Navigator>
    );
  }

  function NewChallengeScreen() {
    return (
      <NewChallengeStack.Navigator mode="modal">
        <NewChallengeStack.Screen
          name="New Challenge"
          component={NewChallenge}
          options={{
            headerTitle: () => <Text style={styles.title}>CareShare</Text>,
          }}
        />
      </NewChallengeStack.Navigator>
    );
  }
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator mode="modal">
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <Text style={styles.title}>CareShare</Text>,
          }}
        />
        <HomeStack.Screen
          name="View Challenge"
          component={ViewChallenge}
          options={{
            headerTitle: () => <Text style={styles.title}>CareShare</Text>,
          }}
        />
        {/* <HomeStack.Screen
          name="New Challenge"
          component={NewChallenge}
        /> */}
      </HomeStack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === "Create Challenge") {
              iconName = focused ? 'rocket' : 'rocket-outline';
            } else if (route.name === "Explore") {
              iconName = focused ? 'compass' : 'compass-outline';
            }

            return <Ionicons name={iconName} size={30} color={color} />
          }
        })}
        tabBarOptions={{
          labelStyle: { fontSize: 10},
          // showLabel: false,
          activeTintColor: '#2FDA77',
          inactiveTintColor: '#555555'
        }}
      >
        <Tab.Screen name="Create Challenge" component={NewChallengeScreen} />
        <Tab.Screen name="Home" component={HomeStackScreen} />

        <Tab.Screen name="Explore" component={ExploreStackScreen} />

      </Tab.Navigator>
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

  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
