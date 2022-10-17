import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLOR_PRIMARY} from '../constants';

const MyBestScore = props => {
  return <Text style={styles.score}>{props.myScore}</Text>;
};

const styles = StyleSheet.create({
  score: {
    color: COLOR_PRIMARY,
    fontSize: 30,
  },
});
export default MyBestScore;
