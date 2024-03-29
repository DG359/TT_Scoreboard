
import { StatusBar } from 'expo-status-bar';
import { Image, FlatList, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { React, useState } from 'react'

import Cards from '../../components/Cards';
import Server from '../../components/Server';
import GameScore from '../../components/GameScore';
import MatchScore from '../../components/MatchScore';

export default function Scoreboard() {

  const [player1, setPlayer1] = useState({
    name: "Player-1",
    yellowCarded: false,
    redCarded: false,
    tookTimeout: false,
    playingEnd: "left",
    matchesWon: 0,
    gamesWon: 0,
    servedFirst: true,
  });

  const [player2, setPlayer2] = useState({
    name: "Player-2",
    yellowCarded: false,
    redCarded: false,
    tookTimeout: false,
    playingEnd: "right",
    matchesWon: 0,
    gamesWon: 0,
    servedFirst: false,
  });

  const [matchScore, setMatchScore] = useState({
    leftGamesWon: 0,
    rightGamesWon: 0
  });

  const [matchScoreHistory, setMatchScoreHistory] = useState([
    {key: 0, p1GamesWon: "P1", p2GamesWon: "P2"}
  ]);

  const bestOf = 3;                                         // max number of games in the match
  const [serverIndex, setServerIndex] = useState(0);        // 0 = server on left; 1 = on right
  const [matchStarted, setMatchStarted] = useState(false);  // records if match is stated so as to prevent a change of server

  return (
    <SafeAreaView style={styles.screenContainer}>

      <View style={[{flex: 0.2},{backgroundColor: 'black'}]}> 
          <Server 
            matchStarted={matchStarted}
            serverIndex={serverIndex} setServerIndex={setServerIndex}
            player1={player1}           setPlayer1={setPlayer1}
            player2={player2}           setPlayer2={setPlayer2}              
          />
      </View>
      
      <View style={[{flex: 3}, styles.matchContainer]}>
        <View View style={styles.matchCardContainer}>
          {(player1.playingEnd == "left") && <MatchScore style={styles.matchContainer} player={player1} gamesWon={player1.gamesWon}/>}
          {(player2.playingEnd == "left") && <MatchScore style={styles.matchContainer} player={player2} gamesWon={player2.gamesWon}/>}
          {(player1.playingEnd == "left") &&  <Cards style={styles.cardContainer} player={player1} setPlayer={setPlayer1}/> }
          {(player2.playingEnd == "left") &&  <Cards style={styles.cardContainer} player={player2} setPlayer={setPlayer2}/> }

        </View>
  
        <View style={styles.gameContainer}>
          <GameScore style={styles.gameContainer}
              matchScore={matchScore}               setMatchScore={setMatchScore}
              serverIndex={serverIndex}             setServerIndex={setServerIndex} 
              matchStarted={matchStarted}           setMatchStarted={setMatchStarted}
              player1={player1}                     setPlayer1={setPlayer1}
              player2={player2}                     setPlayer2={setPlayer2}
              matchScoreHistory={matchScoreHistory} setMatchScoreHistory={setMatchScoreHistory}
              bestOf={bestOf}
          />
        </View>

        <View style={styles.matchCardContainer}>
          {(player1.playingEnd == "right") && <MatchScore style={styles.matchContainer} player={player1} gamesWon={player1.gamesWon}/>}
          {(player2.playingEnd == "right") && <MatchScore style={styles.matchContainer} player={player2} gamesWon={player2.gamesWon}/>} 
          {(player1.playingEnd == "right") &&  <Cards style={styles.cardContainer} player={player1} setPlayer={setPlayer1}/> }
          {(player2.playingEnd == "right") &&  <Cards style={styles.cardContainer} player={player2} setPlayer={setPlayer2}/> }            
        </View>

      </View>     

      <View style={styles.matchHistoryContainer}>
        <FlatList
          data={matchScoreHistory}
          renderItem={({item}) => <Text style={styles.matchHistoryText}>{item.p1GamesWon} - {item.p2GamesWon}</Text>}
        />
      </View>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  cardContainer: {
    flex: 1,
  },

  gameContainer: {
    flex: 5,
    flexDirection: 'row'
  },

  matchCardContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
  },  

  matchContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },  

  scoreboardContainer: {
    flex: 1,
    flexDirection: 'colum'
  },

  screenContainer: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'colum'
  },  

  matchHistoryContainer: {
    flex: 0.1,
    flexDirection: 'colum',
    gap: 10,
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
