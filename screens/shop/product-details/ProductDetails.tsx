import React from 'react'
import { View, Text, ScrollView, Image, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
// types
import Product from '../../../models/product';
import { ICombinedStates } from '../../../state/store';
import { ProductParamList } from '../../../types/navigation.types';
import styles from './ProductDetails.styles';
import colors from '../../../constants/colors';
import { addItemToCart } from '../../../state/cart.state';

type ProductScreenRouteProp = RouteProp<ProductParamList, 'ProductDetails'>;

interface IProductDetailsProps {
  route: ProductScreenRouteProp
}

const ProductDetails = ({ route }: IProductDetailsProps) => {
  const dispatch = useDispatch()
  const productID = route.params.productID;
  const selectedProduct = useSelector<ICombinedStates, Product>(state => state.products.availableProducts.find(product => product.id === productID)!);
  return (
    <ScrollView >
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button title="Add to Cart" color={colors.primary} onPress={() => dispatch(addItemToCart(selectedProduct))} />
      </View>
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

export default ProductDetails;
