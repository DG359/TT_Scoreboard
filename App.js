
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { React, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

function SetupScreen() {
  
  return (
    <Setup />
  )
}
  
function ScoreboardScreen() {
  const [matchConfig, setMatchConfig] = useState({
    p1Name: "Player-1",
    p1End:  "left",
    p2Name: "Player-2",
    p1End:  "right",
    bestof: 5,
    soundOn: false
  });  

  return (
    <Scoreboard matchConfig={matchConfig} setMatchConfig={setMatchConfig}/>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {

  const [matchConfig, setMatchConfig] = useState({
    p1Name: "Player-1",
    p1End:  "left",
    p2Name: "Player-2",
    p1End:  "right",
    bestof: 5,
    soundOn: false
  });  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
        <Stack.Screen name="Scoreboard" component={ScoreboardScreen} options={{ title: 'Castlewarden TT CLub'}}/>
        <Stack.Screen name="Setup" component={SetupScreen} options={{ title: 'Setup' }}/>
      </Stack.Navigator>
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
