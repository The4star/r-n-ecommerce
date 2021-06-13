import React from 'react'
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import colors from '../../../constants/colors';
import Product from '../../../models/product';
import Card from '../../ui/Card';

import styles from './ProductItem.styles';

interface IProductItemProps {
  item: Product;
  onSelect: () => void
  children: any
}

const ProductItem = ({ item, onSelect, children }: IProductItemProps) => {
  return (
    <TouchableOpacity onPress={onSelect}>
      <Card propStyles={styles.product}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          {
            children
          }
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default ProductItem;