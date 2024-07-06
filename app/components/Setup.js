import { React, useState } from 'react'
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { TextInput } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';

import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';

import Speech2Text from './Speech2Text';

export default function Setup({matchConfig, setMatchConfig}) {
    
    const [p1Name, setP1Name] = useState(matchConfig.p1Name);
    const [p2Name, setP2Name] = useState("Player 2")

    const [p1PlaysRightEnd, setP1PlaysRightEnd] = useState(false);
    const [p2PlaysRightEnd, setP2PlaysRightEnd] = useState(true);

    // Dropdown picker setup
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(5);      // default best of selection
    const [items, setItems] = useState([
      {label: '1', value: 1},
      {label: '3', value: 3},
      {label: '5', value: 5},
      {label: '7', value: 7},
    ]);

    const [voiceOn, setVoiceOn] = useState(matchConfig.voiceOn);
    const [voiceRecognitionOn, setVoiceRecognitionOn] = useState(matchConfig.voiceRecognitionOn);

    console.log("Setup Voice On:", voiceOn, "/ Recognition On:", voiceRecognitionOn);

    const toggleEnds = () => {
      setP1PlaysRightEnd(previousState => !previousState);
      setP2PlaysRightEnd(previousState => !previousState);

      if (matchConfig.p1End == "left") {
        setMatchConfig(previousState => {
          return { ...previousState,
            p1End: "right",
            p2End: "left" }
        });
      } else {
        setMatchConfig(previousState => {
          return { ...previousState,
            p1End: "left",
            p2End: "right" }
        });
      }
    }
    
    const handleOnChangeText = (text, field) => {
      if (field == "p1Name" ) {
        setMatchConfig(previousState => {
          return { ...previousState,
            p1Name: text }
        });

      } else if (field == "p2Name") {
        setMatchConfig(previousState => {
          return { ...previousState,
            p2Name: text }
        });  

      } else {

      }
    }

    const handleOnClose = () => {
 
        setMatchConfig(previousState => {
          return { ...previousState,
            bestof: value }
        });
    }

    const toggleVoice = () => {
      setVoiceOn(previousState => !previousState);
      
      setMatchConfig(previousState => {
      
        return { ...previousState,
          voiceOn: !voiceOn }
      });  
    }

    const toggleVoiceRecognition = () => {
      setVoiceRecognitionOn(previousState => !previousState);

      setMatchConfig(previousState => {
        return { ...previousState,
          voiceRecognitionOn: !voiceRecognitionOn }
      }); 
    }

    return (
      <View style={styles.container}>

        <View>

        <View style={styles.playerContainer}>
        
          <TextInput
            style={styles.input}
            label="Player 1 Name"
            left={<TextInput.Icon name="account" />}
            placeholder={p1Name}
            onChangeText={text => handleOnChangeText(text, "p1Name")}
            mode="outlined"
         />

         <View style={styles.switchContainer}>
           <Text> Play Left End</Text>

           <Switch
             style={styles.switch}
             trackColor={{false: '#000000', true: '#000000'}}
             thumbColor={p1PlaysRightEnd ? '#f5dd4b' : '#f4f3f4'}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={toggleEnds}
              value={p1PlaysRightEnd}
           />

            <Text> Play Right End</Text>
          </View>
          
        </View>
       
        <View style={styles.playerContainer}>
        
         <TextInput
            style={styles.input}
            label="Player 2 Name"
            left={<TextInput.Icon name="account" />}
            placeholder={p2Name}
            onChangeText={text => handleOnChangeText(text, "p2Name")}
            mode="outlined"
          />

          <View style={styles.switchContainer}>
            <Text> Play Left End</Text>

            <Switch
              style={styles.switch}
              trackColor={{false: '#000000', true: '#000000'}}
              thumbColor={p1PlaysRightEnd ? '#f5dd4b' : '#f4f3f4'}
              
              // ios_backgroundColor="#3e3e3e"
              onValueChange={toggleEnds}
              value={p2PlaysRightEnd}
            />

            <Text> Play Right End</Text>
          </View>
        </View>

        <Text>Best of how many games:</Text>
        <DropDownPicker
          style={styles.dropdownContainer}
          open={open}
          value={value}
          items={items}
          onClose={handleOnClose}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
       />

          <Pressable onPress={() => {toggleVoice()}}>
            { (voiceOn == true) && <Ionicons name="volume-medium-sharp" size={24} color="black" />}
            { (voiceOn == false) && <Ionicons name="volume-mute" size={24} color="black" />}
          </Pressable>

          <Pressable onPress={() => {setVoiceRecognitionOn(!voiceRecognitionOn)}}>
            { (voiceRecognitionOn == true) && 
              <View>
                <Ionicons name="mic" size={24} color="black" /> 
                <Text>On</Text>
              </View>}
            { (voiceRecognitionOn == false) && <Ionicons name="mic-off" size={24} color="black" />}
          </Pressable>

        </View>
      </View>
    );
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'colum',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },

    dropdownContainer: {
      align: 'right',
      borderColor: "gray",
      width: "20%",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
    },

    input: {
        align: 'centre',
        borderColor: "gray",
        width: "50%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
      },

    playerContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
      },

      switch: {
        marginLeft: 10
      },

    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },

  });

  
