import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';


import colours from '../config/colours'


export default function History({matchScoreHistory, gameScoreHistory}) {

    console.log('>>>> History');
    
    return (
        <View style={styles.container}>
        <View style={styles.historicalScoreContainer}>
          <FlatList
            data={matchScoreHistory}
            renderItem={({item}) => <Text style={styles.matchHistoryText}>{item.p1GamesWon} - {item.p2GamesWon}</Text>}
          />
        </View>

        <View style={styles.historicalScoreContainer}>
          <FlatList
            data={gameScoreHistory}
            renderItem={({item}) => <Text style={styles.matchHistoryText}> {item.game}:{item.p1PointsFor}-{item.p2PointsFor}</Text>}
          />
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
  
    container: {
      flex: 0.1,
      flexDirection: 'row',
      gap: 50,
    },
  
    historicalScoreContainer: {
      alignItems: 'center',
      backgroundColor: colours.scoreboardBackground,
      flex: 1,
      justifyContent: 'center',
    },
  
    matchHistoryText: {
      ...Platform.select({
        android: {
          fontSize: 20,
        },
        ios: {
          fontSize: Platform.isPad ? 20 : 20,
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
  
  });