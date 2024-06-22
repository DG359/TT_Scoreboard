import { Pressable, StyleSheet, View } from 'react-native'
import { useState } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons';

export default function IconMenu ({volumeOn, setVolumeOn, voiceRecognitionOn, setVoiceRecognitionOn}) {

    return (
        <View style={styles.container}>
        <Pressable onPress={() => {setVolumeOn(!volumeOn)}}>
          { (volumeOn == true) && <Ionicons name="volume-medium-sharp" size={24} color="white" />}
          { (volumeOn == false) && <Ionicons name="volume-mute" size={24} color="white" />}
        </Pressable>

        <Pressable onPress={() => {setVoiceRecognitionOn(!voiceRecognitionOn)}}>
          { (voiceRecognitionOn == true) && <Ionicons name="mic-off" size={24} color="white" />}
          { (voiceRecognitionOn == false) && <Ionicons name="mic" size={24} color="white" />}
        </Pressable>
    </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
    }

})  