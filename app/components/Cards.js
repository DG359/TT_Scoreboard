import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { React, useState } from 'react'

import colours from '../config/colours'

const yellowCardPressed = false;
const redCardPressed = false;
const timeoutPressed = true;

export default function Cards({player, setPlayer}) {

  const [redCardPressed, setRedCardPressed] = useState(player.redCarded);
  const [yellowCardPressed, setYellowCardPressed] = useState(player.yellowCarded);
  const [timeoutPressed, setTimeoutPressed] = useState(player.tookTimeout);

  const handleOnPressRedCard = () => {

    setRedCardPressed(redCardPressed => !redCardPressed)

    setPlayer(previousState => {
      return { ...previousState,
        redCarded: !player.redCarded
      }
    });

  };

 const handleOnPressYellowCard = () => {
  
  setYellowCardPressed(yellowCardPressed => !yellowCardPressed)

  setPlayer(previousState => {
    return { ...previousState,
      yellowCarded: !player.yellowCarded
    }
  });

};
 
 const handleOnPressTimeout = () => { 
  
  setTimeoutPressed(timeoutPressed => !timeoutPressed)

  setPlayer(previousState => {
    return { ...previousState,
      tookTimeout: !player.tookTimeout
    }
  });
 };

  return (
    
    <View style={styles.container}>
      
      <Pressable style={styles.yellowCardContainer} onPress={handleOnPressYellowCard}>
        <View style={[styles.yellowCardContainer, {backgroundColor: yellowCardPressed ? 'yellow' : colours.scoreboardBackground}]} /> 
      </Pressable>

      
      <Pressable style={styles.redCardContainer} onPress={handleOnPressRedCard}>
        <View style={[styles.redCardContainer, {backgroundColor: redCardPressed ? 'red' : colours.scoreboardBackground}]} /> 
      </Pressable>

      <Pressable style={styles.timeoutCardContainer} onPress={handleOnPressTimeout}>
        <View style={styles.timeoutCardContainer}> 
          <Text style={[styles.timeoutText, {color: timeoutPressed ? colours.scoreboardBackground : 'white'}]} allowFontScaling>TIMEOUT</Text>
        </View>
      </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'column',
      gap: 10,
    },
  
    redCardContainer: {
        backgroundColor: redCardPressed ? 'red' : colours.scoreboardBackground,
        borderColor: 'red',
        borderWidth: 2,
        flex: 1,
      },

    timeoutCardContainer: {
      backgroundColor: timeoutPressed ? 'white' : colours.scoreboardBackground,
      borderColor: 'white',
      borderWidth: 2,
      justifyContent: 'center',
      flex: 1,
    },

    timeoutText: {
      ...Platform.select({
        android: {
          fontSize: 30,
        },
        ios: {
          fontSize: Platform.isPad ? 30 : 15,
        },
        default: {
          // other platforms, web for example
          fontSize: 45,
        },
      }),
      textAlign: 'center',
      color: colours.scoreboardBackground
    },

    yellowCardContainer: {
        backgroundColor: yellowCardPressed ? 'yellow' : colours.scoreboardBackground,
        borderColor: 'yellow',
        borderWidth: 2,
        flex: 1,
      },
  })