import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './CartItem.styles';
import CartItem from '../../../models/cart-item';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../../../state/cart.state';

interface CartItemProps {
  cartItem: CartItem;
  canDelete?: boolean
}

const CartItemComponent = ({ cartItem, canDelete }: CartItemProps) => {
  const dispatch = useDispatch()
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{cartItem.quantity} </Text><Text style={styles.mainText}>{cartItem.productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{cartItem.sum.toFixed(2)}</Text>
        {
          canDelete ?
            <TouchableOpacity onPress={() => dispatch(removeItemFromCart(cartItem))} style={styles.deleteButton}>
              <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} color='red' />
            </TouchableOpacity>
            : null
        }
      </View>
    </View>
  )
}

export default CartItemComponent;
