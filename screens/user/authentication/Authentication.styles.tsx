import React from 'react';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "90%",
    padding: 20,
    maxWidth: 400,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSection: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20
  }
})

export default styles;