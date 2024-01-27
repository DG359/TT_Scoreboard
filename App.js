//import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { React, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

import Button from './app/components/Button';
import Scoreboard from './app/assets/screens/Scoreboard';
import Setup from './app/components/Setup';
  
function HomeScreen({navigation}) {

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.container}> 
        <ImageBackground source={require('./app/assets/images/appBackground.png')} resizeMode="cover" style={styles.image}/>
        <Button
          title="Start"
          onPress={() => navigation.navigate('Scoreboard')}
        />
        <Button
          title="Setup"
          onPress={() => navigation.navigate('Setup')}
        />
      </View>
    </SafeAreaView>
  );
}

function SetupScreen(navigation, route) {
  
console.log(">>>Setup: ", route.params);

  return (
    <Setup matchConfig={route.params.matchConfig} setMatchConfig={route.params.setMatchConfig}/>
  )
}
  
function ScoreboardScreen() {
  const [matchConfig, setMatchConfig] = useState({
    p1Name: "Player-1",
    p1End:  "left",
    p2Name: "Player-2",
    p1End:  "right",
    bestof: 3,
    soundOn: false
  });  

  return (
    <Scoreboard matchConfig={matchConfig} setMatchConfig={setMatchConfig}/>
  );
}


const Stack = createNativeStackNavigator();

// const Drawer = createDrawerNavigator();


export default function App() {

  const [matchConfig, setMatchConfig] = useState({
    p1Name: "DAVE",
    p1End:  "left",
    p2Name: "Player-2",
    p1End:  "right",
    bestof: 3,
    soundOn: false
  });  

  const [useDrawerNavigation, setUseDrawerNavigation] = useState(false);

 // console.log(">>>SETUP:", matchConfig);

  return (
    <NavigationContainer>
      {(useDrawerNavigation == false) && <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
        <Stack.Screen name="Scoreboard" component={ScoreboardScreen} options={{ title: 'Castlewarden TT CLub'}}/>
        <Stack.Screen 
          name="Setup" 
          component={SetupScreen}
          initialParams={{ matchConfig: matchConfig,  setMatchConfig:setMatchConfig}}
          options={{ title: 'Setup' }}/>
      </Stack.Navigator>}
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

});
