import * as React from 'react';
import { Platform, Pressable, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function Timeout({timeoutStatus, setTimeoutStatus}) {

    const [isPlaying, setIsPlaying] = React.useState(true)

    const handleStopCountDown = () => {
        setIsPlaying(prev => !prev);
        setTimeoutStatus(prev => "Over");
    }

    return (


      <Pressable onPress={handleStopCountDown}>      
        <View style={styles.container}>
         <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={60}
            colors={["#dc143c", "#dc143c", "#dc143c"]}
            colorsTime={[10, 5, 0]}
            onComplete={() => ({ shouldRepeat: false, delay: 2 })}
            updateInterval={1}
           >
         {({ remainingTime, color }) => (
            <Text style={{ color, fontSize: 40 }}>
             {remainingTime}
            </Text>
          )}
        </CountdownCircleTimer>
      </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: Platform.isPad ? 'black' : 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },

    timeoutOverButton: {
      backgroundColor: 'red',
      padding: 10,
    },

    timeoutOverText: {
      color: 'white',
      fontSize: 20,
    },

  });
  
