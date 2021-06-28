import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ListRenderItemInfo, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItemComponent from '../../../components/shop/cart-item/CartItem';
import Card from '../../../components/ui/Card';
import colors from '../../../constants/colors';
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
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  const sendOrderHandler = async (cartItems: CartItem[], cartTotalAmount: number) => {
    setisLoading(true)
    try {
      await dispatch(addOrder(cartItems, cartTotalAmount))
    } catch (err) {
      console.log(err);

      setError(err.message);
    }
    setisLoading(false)
  }

  useEffect(() => {
    if (error) {
      Alert.alert("An error has occured", error, [{ text: "Okay" }])
    }
  }, [error])

  return (
    <View style={styles.screen}>
      <Card propStyles={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${processedTotal.toFixed(2)}</Text>
        </Text>
        {
          isLoading ?
            <ActivityIndicator size="small" color={colors.primary} />
            :
            <Button title="Order Now" onPress={() => sendOrderHandler(cartItems, cartTotalAmount)} disabled={!cartItems.length} />
        }
      </Card>
      <FlatList data={cartItems} renderItem={(itemData: ListRenderItemInfo<CartItem>) => <CartItemComponent cartItem={itemData.item} canDelete />} />
    </View>
  )
}

export default Cart
