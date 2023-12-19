import { StatusBar } from 'expo-status-bar';
import { Image, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { React, useState } from 'react'

import WelcomeScreen from './app/assets/screens/WelcomeScreen';
import ViewScoreBoard from './app/assets/screens/ViewScoreBoard';

import Cards from './app/components/Cards';
import Server from './app/components/Server';
import GameScore from './app/components/GameScore';
import MatchScore from './app/components/MatchScore';

export default function App() {

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

  const [matchScoreHistory, setMatchScoreHistory] = useState([]);

  const bestOf = 3;                                         // number of games that must be won to take the match
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

      <View>
        <Text style={styles.matchHistoryText}>Running Score: </Text>
        <ul>
          {matchScoreHistory.map(score => (
            <li key={score.id}>{score.p1GamesWon} - {score.p2GamesWon}</li>
          ))}
        </ul>
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

  matchHistoryText: {
    ...Platform.select({
      android: {
        fontSize: 20,
      },
      ios: {
        fontSize: Platform.isPad ? 50 : 20,
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
