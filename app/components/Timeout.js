import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function Timeout({timeoutStatus, setTimeoutStatus}) {

    const [isPlaying, setIsPlaying] = React.useState(true)

    const handleStopCountDown = () => {
        setIsPlaying(prev => !prev);
        setTimeoutStatus(prev => "Over");
    }

    return (
        <View style={styles.container}>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={60}
          colors={["#000000", "#dc143c", "#dc143c"]}
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
      <Button title="Over" onPress={handleStopCountDown} />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    }
  });
  
