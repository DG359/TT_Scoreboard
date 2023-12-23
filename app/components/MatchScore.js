import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { React, useState } from 'react'

import colours from '../config/colours'

export default function MatchScore({player, gamesWon}) {

  
  return (
    <View style={styles.container}>
      <Text style={styles.playerNameText}>{player.name}</Text>
      <Text style={styles.matchScoreText}>{gamesWon}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'colours.scoreboardBackground'
      },

  matchScoreText: {
    ...Platform.select({
      android: {
        fontSize: 120,
      },
      ios: {
        fontSize: Platform.isPad ? 150 : 120,
      },
      default: {
        // other platforms, web for example
        fontSize: 200,
      },
    }),
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',

  },

  playerNameText: {
    ...Platform.select({
      android: {
        fontSize: 20,
      },
      ios: {
        fontSize: Platform.isPad ? 20 : 20,
        margin: Platform.isPad ? 0 : 0,
      },
      default: {
        // other platforms, web for example
        fontSize: 20,
      },
    }),
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',

  },
}) 