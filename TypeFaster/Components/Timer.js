import React from 'react';
import {Text} from 'react-native';

const Timer = props => {
  const wordsPerMinute = () => {};

  return (
    <>
      <Text>{props.time}</Text>
      <Text>{props.letterCounter}</Text>
      <Text>
        {props.time != 0 &&
          parseInt((props.letterCounter * 60) / props.time / 5)}{' '}
        words per minute
      </Text>
    </>
  );
};

export default Timer;
