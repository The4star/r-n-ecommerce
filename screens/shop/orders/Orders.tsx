import React from 'react';
import { Text, View, FlatList, ListRenderItemInfo } from 'react-native';
import { useSelector } from 'react-redux';
import OrderItem from '../../../components/orders/orderItem/OrderItem';
import Order from '../../../models/order';
import { ICombinedStates } from '../../../state/store';

const Orders = () => {
  const orders = useSelector<ICombinedStates, Order[]>(state => state.orders.orders)
  return <FlatList data={orders} renderItem={(itemData: ListRenderItemInfo<Order>) => <OrderItem order={itemData.item} />} />
}

export default Orders
