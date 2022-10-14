/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import data from './data/texts.json';
import CustomButton from './Components/CustomButton.js';
import Timer from './Components/Timer.js';
import Winner from './Components/Winner.js';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
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
  const getCurrentTime = () => {
    const d = new Date();
    return d.getHours() * 24 * 3600 + d.getSeconds() + d.getMinutes() * 60;
  };

  const ALL_DATA = data.data.map(x => x.txt);

  const [randomTxt, setRandomTxt] = React.useState(
    ALL_DATA[Math.floor(Math.random() * (20 - 0) + 0)],
  );

  const [userInput, setUserInput] = React.useState('');
  const [getSeconds, setGetSeconds] = React.useState('');

  useEffect(() => {
    setRandomTxt(ALL_DATA[Math.floor(Math.random() * (20 - 0) + 0)]);
    setGetSeconds(getCurrentTime());
    console.log(getSeconds);
  }, []);

  const generateTextColor = [];
  let tempLetterCounter = 0;
  [...userInput].forEach((ch, index) => {
    if (ch === randomTxt[index]) {
      console.log(index, 'equal');
      generateTextColor.push(
        <Text key={index} style={styles.charEqual}>
          {ch}
        </Text>,
      );
      tempLetterCounter++;
    } else {
      console.log(index, 'not equal');
      generateTextColor.push(
        <Text key={index} style={styles.charNotEqual}>
          {ch}
        </Text>,
      );
    }
  });

  const setText = x => {
    if (x.length <= randomTxt.length) {
      setUserInput(x);
    }
  };

  const handleReset = () => {
    setUserInput('');
    setGetSeconds(getCurrentTime());
    setRandomTxt(ALL_DATA[Math.floor(Math.random() * (20 - 0) + 0)]);
  };

  const allData = <Text>{randomTxt}</Text>;
  const scrollViewRef = useRef();

  const checkWinner = () => {
    return randomTxt.length === tempLetterCounter;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />

      <View
        style={{
          minHeight: '40%',
          maxHeight: '40%',
          maxWidth: '90%',
          minWidth: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 50,
        }}>
        {allData}
        <TextInput
          multiline={true}
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

      {checkWinner() && <Winner />}
      <Timer
        letterCounter={tempLetterCounter}
        time={getCurrentTime() - getSeconds}
      />
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
  },
  charEqual: {
    color: COLOR_GREEN,
  },
  charNotEqual: {
    color: COLOR_RED,
  },
});

export default App;
