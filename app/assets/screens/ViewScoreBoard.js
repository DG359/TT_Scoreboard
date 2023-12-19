import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import colours from '../../config/colours'

export default function ViewScoreBoard() {
  return (
    <View>
      <Text style={styles.text}>ViewScoreBoard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: colours.secondary,
  },
})