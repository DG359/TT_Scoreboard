
import { SafeAreaView, StyleSheet } from 'react-native';

import History from '../../components/History';

export default function MatchHistory({matchScoreHistory, gameScoreHistory}) {

    return(

        <SafeAreaView style={styles.screenContainer}>

            <History matchScoreHistory={matchScoreHistory} gameScoreHistory={gameScoreHistory}/>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    screenContainer: {
        backgroundColor: 'black',
        flex: 1,
        flexDirection: 'colum'
      },  

});

