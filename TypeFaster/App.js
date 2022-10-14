import React from 'react';
import data from './data/texts.json';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  console.log(data);

  return (
    <SafeAreaView>
      <Text>Test</Text>
    </SafeAreaView>
  );
};

export default App;
