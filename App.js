import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { React, useState } from 'react'


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Button from './app/components/Button';
import Scoreboard from './app/assets/screens/Scoreboard';
import Setup from './app/components/Setup';
  

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();


function HomeScreen({navigation, route}) {

//  React.useEffect(() => {
   // if (route.params?.matchConfig) {
      // matchConfig updated, do something with `route.params.matchConfig`
   //    console.log(">>>Back in Home Screen: ");
   // }
  //}, [route.params?.matchConfig]);

  console.log(">>>>Homescreen: ",route.params.matchConfig);

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.container}> 
        <ImageBackground source={require('./app/assets/images/appBackground.png')} resizeMode="cover" style={styles.image}/>
        
        <Button
          title="Start"
          onPress={() => {
            // Pass and merge params back to home screen
            navigation.navigate({
              name: 'Scoreboard',
              params: { matchConfig: route.params.matchConfig },
              merge: true,
            });
          }}
        />

        <Button
          title="Setup"

          onPress={() => {
            // Pass and merge params back to home screen
            navigation.navigate({
              name: 'Setup',
              params: { matchConfig: route.params.matchConfig },
              merge: true,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function SetupScreen({ navigation, route }) {
  //const [matchConfig, setMatchConfig] = useState({
  //  p1Name: "Player-11",
  //  p1End:  "left",
  //  p2Name: "Player-22",
  //  p1End:  "right",
  //  bestof: 3,
  //  soundOn: false
  //}); 

  console.log(">>>>SetupScreen: ",route.params.matchConfig);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}> 

      <Setup matchConfig={route.params.matchConfig} setMatchConfig={route.params.setMatchConfig}/>
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { matchConfig: route.params.matchConfig },
            merge: true,
          });
        }}
      />
    </View>
  </SafeAreaView>

  )
}
  
function ScoreboardScreen({ navigation, route }) {
  //const [matchConfig, setMatchConfig] = useState({
  //  p1Name: "Player-1",
  //  p1End:  "left",
  //  p2Name: "Player-2",
  //  p1End:  "right",
  //  bestof: 3,
  //  soundOn: false
  //});  


  console.log(">>>>SetupScreen: ",route.params.matchConfig);

  return (
    <Scoreboard matchConfig={route.params.matchConfig} setMatchConfig={route.params.setMatchConfig}/>
  );
}


export default function App() {

  const [matchConfig, setMatchConfig] = useState({
    p1Name: "Player-1",
    p1End:  "left",
    p2Name: "Player-2",
    p1End:  "right",
    bestof: 5,
    soundOn: false
  });  


  const [volumeOn, setVolumeOn] = useState(false);
  const [voiceRecognitionOn, setVoiceRecognitionOn] = useState(false);
  const [useDrawerNavigation, setUseDrawerNavigation] = useState(false);


  console.log(">>>HOME:", matchConfig);

  return (
    <NavigationContainer>
      {(useDrawerNavigation == false) && <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          initialParams={{ matchConfig: matchConfig,  setMatchConfig:setMatchConfig}}
          options={{ title: 'Home' }}/>
        <Stack.Screen
          name="Scoreboard" 
          component={ScoreboardScreen}
          initialParams={{ matchConfig: matchConfig,  setMatchConfig:setMatchConfig}}
          options={{ title: 'Castlewarden TT CLub',
          }}/>


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
