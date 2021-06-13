import React from 'react';
import { View, Text, FlatList, Button, ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItemComponent from '../../../components/shop/cart-item/CartItem';
import Card from '../../../components/ui/Card';
import CartItem from '../../../models/cart-item';
import { addOrder } from '../../../state/orders.state';
import { ICombinedStates } from '../../../state/store';
import styles from './Cart.styles';

const Cart = () => {
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector<ICombinedStates, number>(state => state.cart.totalAmount);
  const processedTotal = Math.round(cartTotalAmount * 100) / 100;
  const cartItems = useSelector<ICombinedStates, CartItem[]>(state => {
    const CartItemsArray = []
    for (const cartItem in state.cart.items) {
      CartItemsArray.push(state.cart.items[cartItem])
    }
    return CartItemsArray
  })
  return (
    <View style={styles.screen}>
      <Card propStyles={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${processedTotal.toFixed(2)}</Text>
        </Text>
        <Button title="Order Now" onPress={() => dispatch(addOrder(cartItems, cartTotalAmount))} disabled={!cartItems.length} />
      </Card>
      <FlatList data={cartItems} renderItem={(itemData: ListRenderItemInfo<CartItem>) => <CartItemComponent cartItem={itemData.item} canDelete />} />
    </View>
  )
}

export default Cart
