import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'

export default function HomeScreen () {
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}> 
          <ImageBackground source={require('../images/appBackground.png')} resizeMode="cover" style={styles.image}/>
        </View>
      </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
    
    image: {
        flex: 1,
        justifyContent: 'flex-end'
      },
})
