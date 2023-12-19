import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { React, useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts';

import colours from '../config/colours'

let nextId = 0;     // array index for match history



export default function GameScore({matchScore, setMatchScore, serverIndex, setServerIndex, matchStarted, setMatchStarted, player1, setPlayer1, player2, setPlayer2, matchScoreHistory, setMatchScoreHistory, bestOf}) {

  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [matchOver, setMatchOver] = useState(false);

  const handleOnPressLeftScore = () => {

    // only handle the press if game is not already over
    if (!gameOver) {

      // check upfront if adding 1 to the score will result in a change of server or game over
      // since setting the new score is an asynchronus update, it may not be applied

      // check if game is now over
      if ((leftScore + 1) >= 11 && ((leftScore + 1 - rightScore) > 1)) {

        // increment match score and swap ends
        setMatchScore(previousState => {
          return { ...previousState,
            leftGamesWon:matchScore.rightGamesWon,
            rightGamesWon: matchScore.leftGamesWon + 1 }
        });

        updateMatchScore("left");
      } 
      // otherwise check it there's a change of server
      else if (changeOfServerRequired() === true) {
        setServerIndex(serverIndex => !serverIndex)
      }

      if (leftScore < 11 || ((leftScore - rightScore) < 2)) {
        setLeftScore(leftScore => leftScore + 1);
     }
    
      // record the the match has started
      if (!matchStarted) {
        setMatchStarted(matchStarted => true)
      }
    }
  }

  const handleOnPressRightScore = () => {

    // only handle the press if game is not already over
    if (!gameOver) {

      // check upfront if adding 1 to the score will result in a change of server or game over
      // since setting the new score is an asynchronus update, it may not be applied

      // check if game is now over
      if ((rightScore + 1) >= 11 && ((rightScore + 1 - leftScore) > 1)) {

        // increment match score and swap ends
        setMatchScore(previousState => {
          return { ...previousState, 
            leftGamesWon:matchScore.rightGamesWon + 1,
            rightGamesWon: matchScore.leftGamesWon}
        });

        updateMatchScore("right");
      } 

      // otherwise check it there's a change of server
      else if (changeOfServerRequired() === true) {
        setServerIndex(serverIndex => !serverIndex)
      }

      if (rightScore < 11 || ((rightScore - leftScore) < 2)) {
        setRightScore(rightScore => rightScore + 1)
     }

      // record the the match has started
      if (!matchStarted) {
        setMatchStarted(matchStarted => true)
      }
    }
  }

  const updateMatchScore = (winningEnd) => {

    if (player1.playingEnd == winningEnd) {
      
      if ((player1.gamesWon + 1) > (bestOf / 2)) {
        setMatchOver(matchOver => true)
      }
      else {
        setGameOver(gameOver => true)
      }

      setPlayer1(previousState => {
        return { ...previousState,
          gamesWon: player1.gamesWon + 1 }
      });
    } else {
           
      if ((player2.gamesWon + 1) > (bestOf / 2)) {
        setMatchOver(matchOver => true)
      }
      else {
        setGameOver(gameOver => true)
      }
      
      setPlayer2(previousState => {
        return { ...previousState,
          gamesWon: player2.gamesWon + 1 }
      });
    }
  }

  const swapEnds = () => {

    if (player1.playingEnd == "left") {
      setPlayer1(previousState => {
        return { ...previousState,
          playingEnd: "right" }
      });

      setPlayer2(previousState => {
        return { ...previousState,
          playingEnd: "left" }
      }); 
    } else {
      setPlayer1(previousState => {
        return { ...previousState,
          playingEnd: "left" }
      });

      setPlayer2(previousState => {
        return { ...previousState,
          playingEnd: "right" }
      });
    }
}

  const changeOfServerRequired = () => {
    return ((((leftScore + rightScore) % 2) == 0) || (leftScore >= 10) || (rightScore >= 10))? false : true
  }

  const resetGameScore = () => {
    setLeftScore(leftScore => 0);  
    setRightScore(rightScore => 0);  
  }

  const resetMatchScore = () => {

    resetGameScore();

    setPlayer1(previousState => {
      return { ...previousState,
        gamesWon: 0,
        yellowCarded: false,
        redCarded: false,
        tookTimeout: false,
      }
    });

    setPlayer2(previousState => {
      return { ...previousState,
        gamesWon: 0,
        yellowCarded: false,
        redCarded: false,
        tookTimeout: false,
      }
    });
  }

  const saveMatchScoreHistory = () => {
    setMatchScoreHistory([
      ... matchScoreHistory,
      {id: nextId++, p1GamesWon: player1.gamesWon, p2GamesWon: player2.gamesWon}
    ]);

    console.log("History", matchScoreHistory[0].p1GamesWon, "-", matchScoreHistory[0].p2GamesWon);
  }

  const hideGameOverAlert = () => {  
      setGameOver(gameOver => false);
      swapEnds();
      resetGameScore();
  }

  const hideMatchOverAlert = () => {  
    setMatchOver(MatchOver => false);
    saveMatchScoreHistory();
    swapEnds();
    resetMatchScore();
}


  return (
    <View style={styles.container}>
            
      <Pressable style={styles.leftGameScoreContainer} onPress={handleOnPressLeftScore}>
        <View style={styles.leftGameScoreContainer}> 
          <Text style={styles.gameText}>{leftScore}</Text>
        </View>
      </Pressable>

      <Pressable style={styles.rightGameScoreContainer} onPress={handleOnPressRightScore}>
        <View style={styles.rightGameScoreContainer}>
          <Text style={styles.gameText}>{rightScore}</Text>
        </View>
      </Pressable>

      <AwesomeAlert
          show={gameOver}
          showProgress={false}
          title="GAME OVER"
          message=""
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText=""
          confirmText="Press to Play On"
          confirmButtonColor="#DD6B55"
          onCancelPressed={hideGameOverAlert}
          onConfirmPressed={hideGameOverAlert}
        />


        <AwesomeAlert
          show={matchOver}
          showProgress={false}
          title="MATCH OVER"
          message=""
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText=""
          confirmText="Press to Start a New Match"
          confirmButtonColor="#DD6B55"
          onCancelPressed={hideMatchOverAlert}
          onConfirmPressed={hideMatchOverAlert}
        />  

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
  },

  gameText: {
    ...Platform.select({
      android: {
        fontSize: 200,
      },
      ios: {
        fontSize: Platform.isPad ? 300 : 200,
      },
      default: {
        // other platforms, web for example
        fontSize: 350,
      },
    }),
    textAlign: 'center',
    color: 'white',
  },

  leftGameScoreContainer: {
    backgroundColor: colours.primary,
    justifyContent: 'center',
    flex: 1,
  },

  rightGameScoreContainer: {
    backgroundColor: colours.secondary,
    justifyContent: 'center',
    flex: 1,
  },
})