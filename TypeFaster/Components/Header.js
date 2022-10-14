import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {COLOR_PRIMARY} from '../constants';

export const Header = () => (
  <Text style={styles.HeaderSection}>Type Master</Text>
);

const styles = StyleSheet.create({
  HeaderSection: {
    fontSize: 50,
    textAlign: 'center',
    color: COLOR_PRIMARY,
  },
});
