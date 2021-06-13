import React from 'react';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignContent: "center",
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans'
  },
  detailItems: {
    width: '100%'
  }
})

export default styles;