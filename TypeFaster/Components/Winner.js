import React from 'react';
import {ProgressViewIOSComponent, StyleSheet, Text} from 'react-native';
import {COLOR_PRIMARY} from '../constants';

const Winner = props => {
  return (
    <Text style={styles.winner}>
      Congratulations, You have completed the tour with the score of{' '}
      {props.currentScore} words per minute!
    </Text>
  );
};

const styles = StyleSheet.create({
  winner: {
    fontSize: 25,
    color: COLOR_PRIMARY,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Winner;
