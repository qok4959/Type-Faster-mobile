import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLOR_PRIMARY} from '../constants';

const Winner = () => {
  return (
    <Text style={styles.winner}>
      Congratulations, You have completed the tour!
    </Text>
  );
};

const styles = StyleSheet.create({
  winner: {
    fontSize: 25,
    color: COLOR_PRIMARY,
    fontWeight: 'bold',
  },
});

export default Winner;
