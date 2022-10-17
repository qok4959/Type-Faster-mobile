import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLOR_PRIMARY} from '../constants';

const Timer = props => {
  return (
    <>
      <Text style={styles.timer}>
        {props.time != 0 &&
          parseInt((props.letterCounter * 60) / props.time / 5, 10)}{' '}
        words per minute
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  timer: {
    color: COLOR_PRIMARY,
    fontSize: 15,
  },
});

export default Timer;
