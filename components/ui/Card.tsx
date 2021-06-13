import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ICardProps {
  propStyles: any,
  children: any
}
const Card = ({ propStyles, children }: ICardProps) => {
  return (
    <View style={{ ...styles.card, ...propStyles }}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  }
})

export default Card;


