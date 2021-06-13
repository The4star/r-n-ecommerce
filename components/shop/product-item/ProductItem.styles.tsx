import React from 'react';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  }
})

export default styles;