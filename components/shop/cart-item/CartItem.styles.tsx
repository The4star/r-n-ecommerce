import React from 'react';

import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 20
  },
  deleteButton: {
    marginLeft: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  }

})

export default styles;