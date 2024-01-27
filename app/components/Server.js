import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { React, useState } from 'react'

import colours from '../config/colours'

export default function Server({serverIndex, setServerIndex, matchStarted, player1, setPlayer1, player2, setPlayer2}) {

    const handleSetServer = () => {
        console.log("Server Index: ", serverIndex);

        if (!matchStarted) {
            setServerIndex(serverIndex => !serverIndex);

            // record which player serves first

            if (((serverIndex == 0) && (player1.playingEnd == "left")) || ((serverIndex == 1) && (player1.playingEnd == "right"))) {
                
                setPlayer1(previousState => {
                    return { ...previousState,
                        servedFirst: true }
                });

                setPlayer2(previousState => {
                    return { ...previousState,
                        servedFirst: false }
                    });
            } else {
                setPlayer1(previousState => {
                    return { ...previousState,
                        servedFirst: false }
                });

                setPlayer2(previousState => {
                    return { ...previousState,
                        servedFirst: true }
                });
            }
        }
    }

    return (
        <View style={styles.container}>
      
            <Pressable style={styles.leftServerContainer} onPress={handleSetServer}> 
                <View style={styles.leftServerContainer}> 
                    { (serverIndex == 0) && <Image style={styles.ballContainer} source={require('../assets/images/TTBall.png')} /> }
                </View>
            </Pressable>

            <Pressable style={styles.rightServerContainer} onPress={handleSetServer}> 
                <View style={styles.rightServerContainer}>     
                    { (serverIndex == 1) && <Image style={styles.ballContainer} source={require('../assets/images/TTBall.png')} /> }
                </View>
            </Pressable>

        </View>
  )
}

const styles = StyleSheet.create({

    ballContainer: {
        resizeMode: 'cover',
        width: 50,
        height: 50,
      },

    container: {
        flex: 1,
        flexDirection: 'row',
        gap: 50,
    },

    leftServerContainer: {
        alignItems: 'flex-end',
        backgroundColor: colours.scoreboardBackground,
        flex: 1,
        justifyContent: 'flex-end',
      },
    
    rightServerContainer: {
        alignItems: 'flex-start',
        backgroundColor: colours.scoreboardBackground,
        flex: 1,
        justifyContent: 'flex-end',
      },

    textContainer: {
        color: 'white',
    }
    })  

