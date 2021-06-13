import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import colors from '../../../constants/colors';
import Order from '../../../models/order';
import CartItemComponent from '../../shop/cart-item/CartItem';
import Card from '../../ui/Card';

import styles from './OrderItem.styles'

interface IOrderItemProps {
  order: Order
}
const OrderItem = ({ order }: IOrderItemProps) => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <Card propStyles={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{order.readableDate}</Text>
      </View>
      <Button color={colors.primary} title={showDetails ? "Hide Details" : "Show Details"} onPress={() => { setShowDetails(!showDetails) }} />
      {
        showDetails ?
          <View style={styles.detailItems}>
            {
              order.items.map((orderItem, i) => (
                <CartItemComponent key={`${orderItem.id}-${i}`} cartItem={orderItem} />
              ))
            }
          </View>
          : null
      }
    </Card>
  )
}

export default OrderItem;
