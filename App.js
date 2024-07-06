import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { React, useState } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons';

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Button from './app/components/Button';
import HomeScreen from './app/assets/screens/HomeScreen';
import MatchHistory from './app/assets/screens/MatchHistory';
import Scoreboard from './app/assets/screens/Scoreboard';
import Setup from './app/components/Setup';
import VoiceToText from './app/components/VoiceToText';
  

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();


function WelcomeScreen({navigation, route}) {

//  React.useEffect(() => {
   // if (route.params?.matchConfig) {
      // matchConfig updated, do something with `route.params.matchConfig`
   //    console.log(">>>Back in Home Screen: ");
   // }
  //}, [route.params?.matchConfig]);

  console.log(">>>>WelcomeScreen: ",route.params.matchConfig);

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.container}> 
        <HomeScreen/>
      </View>
    </SafeAreaView>
  );
}

function SetupScreen({ navigation, route }) {

  console.log(">>>>SetupScreen: ",route.params.matchConfig);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}> 

      <Setup matchConfig={route.params.matchConfig} setMatchConfig={route.params.setMatchConfig}/>

    </View>
  </SafeAreaView>

  )
}
  
function ScoreboardScreen({ navigation, route }) {
  return (
    <Scoreboard matchConfig={route.params.matchConfig} setMatchConfig={route.params.setMatchConfig}/>
  );
}

  
function MatchHistoryScreen({ navigation, route }) {
  return (
    <MatchHistory matchConfig={route.params.matchConfig} setMatchConfig={route.params.setMatchConfig}/>
  );
}


export default function App() {

  const [matchConfig, setMatchConfig] = useState({
    p1Name: "Player-1",
    p1End:  "left",
    p2Name: "Player-2",
    p1End:  "right",
    bestof: 5,
    voiceOn: false,
    voiceRecognitionOn: false
  });  

  const [useDrawerNavigation, setUseDrawerNavigation] = useState(false);
  const navigationRef = useNavigationContainerRef(); 


  console.log(">>>HOME:", matchConfig);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
                  if (route.name === 'Home') {
                    iconName = focused ? 'home': 'home';
                  } else if (route.name === 'Setup') {
                    iconName = focused ? 'settings' : 'settings';
                  } else if (route.name === 'Scoreboard') {
                    iconName = focused ? 'play' : 'play'
                  } else if (route.name === 'History') {
                    iconName = focused ? 'archive' : 'archive'
                  }
                  
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
              })}>
        <Tab.Screen 
          name="Home" 
          component={WelcomeScreen} 
          initialParams={{ matchConfig: matchConfig,  setMatchConfig:setMatchConfig}}
          options={{ title: 'Home' }}/>
        <Tab.Screen
          name="Scoreboard" 
          component={ScoreboardScreen}
          initialParams={{ matchConfig: matchConfig,  setMatchConfig:setMatchConfig}}
          options={{ title: 'Play',
          }}/>
        <Tab.Screen
          name="History" 
          component={MatchHistoryScreen}
          initialParams={{ matchConfig: matchConfig,  setMatchConfig:setMatchConfig}}
          options={{ title: 'History',
          }}/>
        <Tab.Screen 
          name="Setup" 
          component={SetupScreen}
          initialParams={{ matchConfig: matchConfig,  setMatchConfig:setMatchConfig}}
          options={{ title: 'Setup' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },

  image: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },


  iconText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'Black',
  },

});
