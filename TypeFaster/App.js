/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useMemo} from 'react';
import data from './data/texts.json';
import CustomButton from './Components/CustomButton.js';
import Timer from './Components/Timer.js';
import Winner from './Components/Winner.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyBestScore from './Components/MyBestScore';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  COLOR_BACKGROUND,
  COLOR_GREEN,
  COLOR_PRIMARY,
  COLOR_RED,
} from './constants';
import {Header} from './Components/Header';

const App = () => {
  const ALL_DATA = data.data.map(x => x.txt);
  let memoizedScore;

  //states
  const [randomTxt, setRandomTxt] = React.useState(
    ALL_DATA[Math.floor(Math.random() * (ALL_DATA.length - 0) + 0)],
  );
  const [userInput, setUserInput] = React.useState('');
  const [getSeconds, setGetSeconds] = React.useState('');
  const [bestScore, setBestScore] = React.useState(0);
  let tempLetterCounter = 0;

  //functions
  const saveBestScore = async value => {
    try {
      console.log('saving best score', value.toString());
      await AsyncStorage.setItem('bestScore', value.toString());
    } catch (e) {
      console.log(e);
    }
  };

  const getBestScore = async () => {
    try {
      const value = await AsyncStorage.getItem('bestScore');
      if (value !== null) {
        return Promise.resolve(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const asyncTest = async () => {
    try {
      const value = await AsyncStorage.getItem('bestScore');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentTime = () => {
    const d = new Date();
    return d.getHours() * 24 * 3600 + d.getSeconds() + d.getMinutes() * 60;
  };

  useEffect(() => {
    setRandomTxt(
      ALL_DATA[Math.floor(Math.random() * (ALL_DATA.length - 0) + 0)],
    );
    setGetSeconds(getCurrentTime());

    const tempScore = async () => {
      let output = await getBestScore();
      return output;
    };
    tempScore().then(x => {
      memoizedScore = x;
      setBestScore(x);
    });
  }, []);

  const generateTextColor = [];

  [...userInput].forEach((ch, index) => {
    if (ch === randomTxt[index]) {
      generateTextColor.push(
        <Text key={index} style={styles.charEqual}>
          {ch}
        </Text>,
      );
      tempLetterCounter++;
    } else {
      generateTextColor.push(
        <Text key={index} style={styles.charNotEqual}>
          {ch}
        </Text>,
      );
    }
  });

  memoizedScore = useMemo(() =>
    parseInt(
      (tempLetterCounter * 60) / (getCurrentTime() - getSeconds) / 5,
      10,
    ),
  );

  const setText = x => {
    if (x.length <= randomTxt.length) {
      setUserInput(x);
    }
  };

  const handleReset = async () => {
    setUserInput('');
    setGetSeconds(getCurrentTime());
    setRandomTxt(ALL_DATA[Math.floor(Math.random() * (20 - 0) + 0)]);
    memoizedScore = isNaN(memoizedScore) ? 0 : memoizedScore;
    console.log('memoized score', memoizedScore, bestScore);

    let test = await getBestScore();
    console.log('bestScorando', test);
    if (isNaN(bestScore)) {
      saveBestScore(memoizedScore);
      setBestScore(memoizedScore);
    }
    if (memoizedScore > bestScore) {
      saveBestScore(memoizedScore);
      setBestScore(memoizedScore);
    }
  };

  const allData = (
    <Text style={{color: COLOR_PRIMARY, fontWeight: 'bold', fontSize: 15}}>
      {randomTxt}
    </Text>
  );
  const scrollViewRef = useRef();

  const checkWinner = () => {
    if (randomTxt.length === tempLetterCounter) {
      return true;
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />

      <View
        style={{
          minHeight: '40%',
          maxHeight: '50%',
          maxWidth: '95%',
          minWidth: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 50,
        }}>
        {allData}
        <TextInput
          caretHidden={true}
          style={styles.textInput}
          multiline={false}
          onChangeText={newTxt => setText(newTxt)}
          placeholder="type here"
          value={userInput}
        />
        <View>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
            }
            horizontal={true}
            style={{width: '80%', maxHeight: '30%'}}>
            <View style={styles.container}>{generateTextColor}</View>
          </ScrollView>
        </View>
      </View>
      <View style={{minHeight: '25%', alignItems: 'center'}}>
        <MyBestScore myScore={bestScore} />
        {checkWinner() && <Winner currentScore={memoizedScore} />}
        <Timer
          letterCounter={tempLetterCounter}
          time={getCurrentTime() - getSeconds}
        />
      </View>

      <CustomButton name="Reset" handleReset={handleReset} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR_BACKGROUND,
  },
  container: {
    width: '80%',
    minWidth: '80%',
    maxWidth: '80%',
    flexDirection: 'row',
  },
  textInput: {
    width: '80%',
    minWidth: '80%',
    maxWidth: '80%',
    fontWeight: 'bold',
    color: COLOR_BACKGROUND,
  },
  charEqual: {
    color: COLOR_GREEN,
  },
  charNotEqual: {
    color: COLOR_RED,
    fontWeight: 'bold',
  },
});

export default App;
