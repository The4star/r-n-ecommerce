import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, FlatList, ListRenderItemInfo, ActivityIndicator, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../../components/orders/orderItem/OrderItem';
import styles from './Orders.styles';
import colors from '../../../constants/colors';
import Order from '../../../models/order';
import { fetchOrders } from '../../../state/orders.state';
import { ICombinedStates } from '../../../state/store';

const Orders = () => {
  const dispatch = useDispatch()
  const orders = useSelector<ICombinedStates, Order[]>(state => state.orders.orders)
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  const fetchOrdersHandler = useCallback(async () => {
    setisLoading(true)
    try {
      await dispatch(fetchOrders())
    } catch (err) {
      setError(err.message)
    }
    setisLoading(false)
  }, [dispatch])

  useEffect(() => {
    fetchOrdersHandler();
  }, [dispatch, fetchOrdersHandler])

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (!isLoading && !orders.length) {
    return (
      <View style={styles.screen}>
        <Text>No orders yet</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <Text>An Error Occured</Text>
        <Text>{error}</Text>
        <Button title="Try Again" onPress={fetchOrdersHandler} />
      </View>
    )
  }

  return <FlatList
    data={orders}
    renderItem={(itemData: ListRenderItemInfo<Order>) => <OrderItem order={itemData.item} />}
  />
}

export default Orders
