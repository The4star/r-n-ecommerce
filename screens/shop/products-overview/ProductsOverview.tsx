import React, { useCallback, useEffect, useState } from 'react'
import { Text, Button, FlatList, ListRenderItemInfo, View, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../../components/shop/product-item/ProductItem';
import Product from '../../../models/product';
import { ICombinedStates } from '../../../state/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductParamList } from '../../../types/navigation.types';
import { addItemToCart } from '../../../state/cart.state';
import colors from '../../../constants/colors';
import { fetchProducts } from '../../../state/products.state';
import styles from './ProductsOverview.styles';


type ProductOverviewNavigationProp = StackNavigationProp<ProductParamList, 'Products'>

interface IProductOverviewProps {
  navigation: ProductOverviewNavigationProp
}

const ProductsOverview = ({ navigation }: IProductOverviewProps) => {
  const dispatch = useDispatch()
  const products = useSelector<ICombinedStates, Product[]>(state => state.products.availableProducts);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  const viewDetails = (product: Product) => {
    navigation.navigate({
      name: 'ProductDetails',
      params: { productID: product.id, productTitle: product.title }
    })
  }

  const loadProducts = useCallback(async () => {
    if (error) {
      setError(null)
    }
    setisLoading(true)
    try {
      await dispatch(fetchProducts())
    } catch (err) {
      setError(err.message);
    }
    setisLoading(false)
  }, [dispatch, setisLoading, setError])

  useEffect(() => {
    navigation.addListener('focus', loadProducts)
    return () => {
      navigation.removeListener('focus', loadProducts)
    }
  }, [loadProducts])

  useEffect(() => {
    loadProducts()
  }, [dispatch, loadProducts])


  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (!isLoading && !products.length) {
    return (
      <View style={styles.screen}>
        <Text>No products found, start adding some!</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <Text>An Error Occured</Text>
        <Text>{error}</Text>
        <Button title="Try Again" onPress={loadProducts} />
      </View>
    )
  }

  return (
    <FlatList data={products} renderItem={(itemData: ListRenderItemInfo<Product>) => <ProductItem
      item={itemData.item}
      onSelect={() => viewDetails(itemData.item)}
    >
      <Button color={colors.primary} title="View Details" onPress={() => viewDetails(itemData.item)} />
      <Button color={colors.primary} title="Add To Cart" onPress={() => dispatch(addItemToCart(itemData.item))} />
    </ProductItem>}
    />
  )
}

export default ProductsOverview;
