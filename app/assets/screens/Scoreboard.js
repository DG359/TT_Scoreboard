
import { FlatList, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { React, useState } from 'react'

import Cards from '../../components/Cards';
import GameScore from '../../components/GameScore';
import IconMenu from '../../components/iconMenu';
import MatchScore from '../../components/MatchScore';
import Server from '../../components/Server';

export default function Scoreboard({matchConfig, setMatchConfig}) {

  console.log(">>>>>Scoreboard: ", matchConfig);

  const [player1, setPlayer1] = useState({
    name: matchConfig.p1Name,
    yellowCarded: false,
    redCarded: false,
    tookTimeout: false,
    playingEnd: "left",
    matchesWon: 0,
    gamesWon: 0,
    servedFirst: true,
  });

  const [player2, setPlayer2] = useState({
    name: matchConfig.p2Name,
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
    {key: 0, p1GamesWon: "P1 Games Won", p2GamesWon: "P2 Games Won"}
  ]);


  const [gameScoreHistory, setGameScoreHistory] = useState([
    {key: 0, matchKey: 0, game: "", p1PointsFor: "P1 Game Score", p2PointsFor: "P2 Game Score"}
  ]);

  const bestOf = 5;                                                     // max number of games in the match
  const [serverIndex, setServerIndex] = useState(0);                    // 0 = server on left; 1 = on right
  const [matchStarted, setMatchStarted] = useState(false);              // records if match is stated so as to prevent a change of server
  
  const [volumeOn, setVolumeOn] = useState(matchConfig.volumeOn);                                 // true = call out score
  const [voiceRecognitionOn, setVoiceRecognitionOn] = useState(matchConfig.voiceRecognitionOn);   //true = listen for score

  return (
    <SafeAreaView style={styles.screenContainer}>

      <View style={[{flex: 0.1},{backgroundColor: 'black'}]}> 
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
              gameScoreHistory={gameScoreHistory}   setGameScoreHistory={setGameScoreHistory}
              bestOf={bestOf}
              volumeOn={volumeOn}
          />
        </View>

        <View style={styles.matchCardContainer}>
          {(player1.playingEnd == "right") && <MatchScore style={styles.matchContainer} player={player1} gamesWon={player1.gamesWon}/>}
          {(player2.playingEnd == "right") && <MatchScore style={styles.matchContainer} player={player2} gamesWon={player2.gamesWon}/>} 
          {(player1.playingEnd == "right") &&  <Cards style={styles.cardContainer} player={player1} setPlayer={setPlayer1}/> }
          {(player2.playingEnd == "right") &&  <Cards style={styles.cardContainer} player={player2} setPlayer={setPlayer2}/> }            
        </View>

      </View>     

      <View style={styles.iconContainer}> 
        <IconMenu
          volumeOn={volumeOn}                     setVolumeOn={setVolumeOn}
          voiceRecognitionOn={voiceRecognitionOn} setVoiceRecognitionOn={setVoiceRecognitionOn}
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

  historyContainer: {
    flex: 0.1,
    flexDirection: 'row',
    gap: 50,
  },

  iconContainer: {
    backgroundColor: 'black',
    flex: 0.1,
    flexDirection: 'colum',
    gap: 10,
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



});
