import * as React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import * as Speech from 'expo-speech';


export default function Text2Speech() {
  const thingToSay = "1, 0" ;
  const speak = () => {
    Speech.speak(thingToSay);
  };

return (
    <View style={styles.container}>
      <Text style={styles.Texts}>{thingToSay}</Text>
      <Button title="Start listening" onPress={speak} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  Texts: {
    marginTop: 10,
    color: 'black',
    padding:10,
  }
})


