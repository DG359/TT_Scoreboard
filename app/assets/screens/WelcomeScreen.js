import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native-web'

export default function WelcomeScreen(props) {
  return (
    <ImageBackground 
        style={styles.background}
        source={require('../images/appBackground.png')}>

        <View style={styles.startButton}>
            START
        </View>

     </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    startButton: {
        width: '50%',
        height: 70,
        backgroundColor: 'white',
        justifyContent: 'center'
    }
})
