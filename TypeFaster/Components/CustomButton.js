import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {COLOR_BACKGROUND, COLOR_PRIMARY} from '../constants';

const CustomButton = props => {
  return (
    <Pressable onPress={props.handleReset} style={styles.buttonReset}>
      <Text style={styles.text}>{props.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonReset: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_PRIMARY,
    width: 130,
    height: 30,
  },
  text: {
    color: COLOR_BACKGROUND,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomButton;
