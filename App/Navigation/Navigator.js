import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ViewChallenge from '../Screens/ViewChallengeScreen';
import NewChallenge from '../Screens/NewChallenge';
import HomeScreen from '../Screens/HomeScreen';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ExploreStack = createStackNavigator();
const newChallengeStack = createStackNavigator();


export default function Navigator() {
  const [loaded, error] = useFonts({ 
    Nunito: require('../Assets/Nunito-Regular.ttf'),
    NunitoSemiBold: require('../Assets/Nunito-SemiBold.ttf')
  });

  function explore() {
    return <View />;
  }

  function ExploreStackScreen() {
    return (
      <ExploreStack.Navigator>
        <ExploreStack.Screen
          name="Explore"
          component={explore}
          options={{ tabBarLabel: 'Explore!' }}
        />
      </ExploreStack.Navigator>
    );
  }

  function newChallengeScreen() {
    return (
      <newChallengeStack.Navigator mode="modal">
        <newChallengeStack.Screen
          name="New Challenge"
          component={NewChallenge}
          options={{
            headerTitle: () => <Text style={styles.title}>CareShare</Text>,
          }}
        />
      </newChallengeStack.Navigator>
    );
  }
  function HomeStackScreen() {
    return (
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
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
            } else if (route.name === "NewChallenge") {
              iconName = focused ? 'rocket' : 'rocket-outline';
            } else if (route.name === "Explore") {
              iconName = focused ? 'compass' : 'compass-outline';
            }

            return <Ionicons name={iconName} size={30} color={color} />
          }
        })}
        tabBarOptions={{
          // labelStyle: { fontSize: 20},
          showLabel: false,
          activeTintColor: '#2FDA77',
          inactiveTintColor: '#555555'
        }}
      >
        <Tab.Screen name="NewChallenge" component={newChallengeScreen} />
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
