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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrdersHandler = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await dispatch(fetchOrders())
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
  }, [dispatch])

  useEffect(() => {
    setIsLoading(true)
    fetchOrdersHandler().then(() => setIsLoading(false));
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
    onRefresh={fetchOrdersHandler}
    refreshing={isRefreshing}
    data={orders}
    renderItem={(itemData: ListRenderItemInfo<Order>) => <OrderItem order={itemData.item} />}
  />
}

export default Orders
