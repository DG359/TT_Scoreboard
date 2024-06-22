import { React, useEffect, useState } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import  Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
}  from '@react-native-community/voice';

export default function Speech2Text() {
    let [micStatus, setMicStatus] = useState(false);
    let [results, setResults] = useState([]);

    useEffect(() => {
      console.log (">>>Setting up event handlers", Voice);
    
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechResults = onSpeechResults;
      console.log ("Listner event were setup");
      //deregister and clean-up
      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      }
    }, []);

  
    const startSpeech2Text = async() => {
      await Voice.start("en-US");

      setMicStatus(true);
    };

    const stopSpeech2Text = async() => {
      await Voice.stop();
      setMicStatus(false);
    };

    const onSpeechResults = (result) => {
      setResults(result.value);
    };
  
    const onSpeechError = (error) => {
      console.log(error);
    };
  

    return (

      <View style={styles.button}>
        {micStatus &&
          <Pressable style={styles.button} onPress={stopSpeech2Text}>
            <Text style={styles.text}>Stop S2T</Text>
          </Pressable> 
        }
        {!micStatus && 
          <Pressable style={styles.button} onPress={startSpeech2Text}>
            <Text style={styles.
              text}>Start S2T</Text>
          </Pressable>
        }
        
        {results.map((result, index) => <Text key={index}>{result}</Text>)}

      </View>      
    );
  }

  const styles = StyleSheet.create({  
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });
