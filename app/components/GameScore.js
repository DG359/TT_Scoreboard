import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { React, useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts';

import colours from '../config/colours'

let nextId = 1;     // array index for match history


export default function GameScore({matchScore, setMatchScore, serverIndex, setServerIndex, matchStarted, setMatchStarted, player1, setPlayer1, player2, setPlayer2, matchScoreHistory, setMatchScoreHistory, bestOf}) {

  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [matchOver, setMatchOver] = useState(false);
  const [swapedEndsInFinalGame, setSwapedEndsInFinalGame] = useState(false);

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
      else {

        // check it there's a change of server
        if (changeOfServerRequired() === true) {
          if (serverIndex == 0) {
            setServerIndex(serverIndex => 1);
          } else {
            setServerIndex(serverIndex => 0);
          }
        }

        // check if a there's a change of ends required in final game
        if (changeOfEndsRequired("left") === true) {
          swapEnds();
          swapGameScores("left");
        }
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

  const handleOnLongPressLeftScore = () => {
    // long press will decrement the score, provided the game is not already over
    if (!gameOver) {

      if (leftScore > 0) {
        // check it there was a change of server
        if (revertServerRequired() === true) {
          if (serverIndex == 0) {
            setServerIndex(serverIndex => 1);
          } else {
            setServerIndex(serverIndex => 0);
          }
        }
        setLeftScore(leftScore => leftScore - 1)
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
      else {

        // check it there's a change of server
        if (changeOfServerRequired() === true) {
          if (serverIndex == 0) {
            setServerIndex(serverIndex => 1);
          } else {
            setServerIndex(serverIndex => 0);
          }
        }

        // check if a there's a change of ends required in final game
        if (changeOfEndsRequired("right") === true) {
          swapEnds();
          swapGameScores("right");
        }
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

  const handleOnLongPressRightScore = () => {

    // long press will decrement the score, provided the game is not already over
    if (!gameOver) {

      if (rightScore > 0) {
        // check it there was a change of server
        if (revertServerRequired() === true) {
          if (serverIndex == 0) {
            setServerIndex(serverIndex => 1);
          } else {
            setServerIndex(serverIndex => 0);
          }
        }
        setRightScore(rightScore => rightScore - 1)
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

  const swapGameScores = (whichEndJustScored) => {

    setSwapedEndsInFinalGame(swapedEndsInFinalGame => true);

    if (whichEndJustScored == "right") {
      setLeftScore(leftScore => rightScore + 1);
      setRightScore(rightScore => leftScore - 1); 
    } 
    else {
      setLeftScore(leftScore => rightScore - 1);
      setRightScore(rightScore => leftScore + 1); 
    }
  }

  const changeOfServerRequired = () => {
    return ((((leftScore + rightScore) % 2) == 0) || (leftScore >= 10) || (rightScore >= 10))? false : true
  }

  // used to check it you need to changed sever after a log press to correct a score
  const revertServerRequired = () => {
    return (((leftScore + rightScore) % 2) == 0) ? true : false
  }


  const changeOfEndsRequired = (whichEndJustScored) => {
    
    if (whichEndJustScored == "right") {
      return (
        ((matchScore.leftGamesWon + matchScore.rightGamesWon + 1) == bestOf) &&
        (swapedEndsInFinalGame == false) &&
        (rightScore + 1 == 5))
    } else {
      return (
        ((matchScore.leftGamesWon + matchScore.rightGamesWon + 1) == bestOf) &&
        (swapedEndsInFinalGame == false) &&
        (leftScore + 1 == 5))      
    }
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

    // reset match score
    setMatchScore(previousState => {
      return { ...previousState,
        leftGamesWon: 0,
        rightGamesWon: 0 }
    });

    // reset staus flags
    setGameOver(gameOver => false);
    setMatchOver(matchOver => false);
    setMatchStarted(matchStarted => false);
    setSwapedEndsInFinalGame(swapedEndsInFinalGame => false);
  }

  const saveMatchScoreHistory = () => {

    setMatchScoreHistory([
      ...matchScoreHistory,
      {key: nextId++, p1GamesWon: player1.gamesWon, p2GamesWon: player2.gamesWon}
    ]);
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

const revertToPreviousGameScore = () => {

  setGameOver(gameOver => false);
  setMatchOver(matchOver => false);

  // revert server
  if (revertServerRequired() === true) {
    if (serverIndex == 0) {
      setServerIndex(serverIndex => 1);
    } else {
      setServerIndex(serverIndex => 0);
    }
  }

  if (leftScore > rightScore) {

    // revert to the game's previous score
    setLeftScore(leftScore => leftScore - 1);

    // revet to the match's previous score
    if (player1.playingEnd == "left") {
      setPlayer1(previousState => {
        return { ...previousState,
          gamesWon: player1.gamesWon - 1 }
      });
    } else {
      setPlayer2(previousState => {
        return { ...previousState,
          gamesWon: player2.gamesWon - 1 }
      });
    }
  } else {
    // revert to the game's previous score
    setRightScore(rightScore => rightScore - 1); 

    // revet to the match's previous score
    if (player1.playingEnd == "right") {
      setPlayer1(previousState => {
        return { ...previousState,
          gamesWon: player1.gamesWon - 1 }
      });
    } else {
      setPlayer2(previousState => {
        return { ...previousState,
          gamesWon: player2.gamesWon - 1 }
      });
    }
  }
}

const correctMatchScore = (winningEnd) => {

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



  return (
    <View style={styles.container}>
            
      <Pressable style={styles.leftGameScoreContainer} 
        onPress={handleOnPressLeftScore}
        onLongPress={handleOnLongPressLeftScore}>
        <View style={styles.leftGameScoreContainer}> 
          <Text style={styles.gameText}>{leftScore}</Text>
        </View>
      </Pressable>

      <Pressable style={styles.rightGameScoreContainer} 
        onPress={handleOnPressRightScore}
        onLongPress={handleOnLongPressRightScore}>
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
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel - Go Back"
          confirmText="OK - Play On"
          cancelButtonColor="red"
          confirmButtonColor="blue"
          onCancelPressed={revertToPreviousGameScore}
          onConfirmPressed={hideGameOverAlert}
        />


        <AwesomeAlert
          show={matchOver}
          showProgress={false}
          title="MATCH OVER"
          message=""
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel - Go Back"
          confirmText="OK - Play On"
          cancelButtonColor="red"
          confirmButtonColor="blue"
          onCancelPressed={revertToPreviousGameScore}
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