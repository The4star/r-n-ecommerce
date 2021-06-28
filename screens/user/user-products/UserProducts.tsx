import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, Button, FlatList, ListRenderItemInfo, Alert, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../../components/shop/product-item/ProductItem';
import colors from '../../../constants/colors';
import Product from '../../../models/product';
import { DeleteProduct, fetchProducts } from '../../../state/products.state';
import { ICombinedStates } from '../../../state/store';
import { AdminParamList } from '../../../types/navigation.types';
import styles from './UserProducts.styles'

type UserProductsNavigationProp = StackNavigationProp<AdminParamList, 'UserProducts'>

interface IUserProductsProps {
  navigation: UserProductsNavigationProp
}

const UserProducts = ({ navigation }: IUserProductsProps) => {
  const dispatch = useDispatch()
  const userProducts = useSelector<ICombinedStates, Product[]>(state => state.products.userProducts)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const editProduct = (product: Product) => {
    navigation.navigate({
      name: 'EditProduct',
      params: { productID: product.id, productTitle: product.title }
    })
  }

  const deleteProduct = async (productId: string) => {
    setIsLoading(true);
    setError(null)
    try {
      await dispatch(DeleteProduct(productId))
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }

  const deleteHandler = (productId: string) => {
    Alert.alert('Are you sure?', " Do you really want to delete this product?",
      [
        { text: "No", style: 'default' },
        { text: "yes", onPress: () => deleteProduct(productId), style: "destructive" }
      ]
    )
  }

  const loadProducts = useCallback(async () => {
    if (error) {
      setError(null)
    }
    setIsRefreshing(true)
    try {
      await dispatch(fetchProducts())
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false)
  }, [dispatch, setIsRefreshing, setError])

  useEffect(() => {
    navigation.addListener('focus', loadProducts)
    return () => {
      navigation.removeListener('focus', loadProducts)
    }
  }, [loadProducts])

  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => setIsLoading(false));
  }, [dispatch, loadProducts])

  useEffect(() => {
    if (error) {
      Alert.alert("An error has occured", error, [{ text: "Okay" }])
    }
  }, [error])

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (!isLoading && !userProducts.length) {
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



  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={userProducts}
      renderItem={(itemData: ListRenderItemInfo<Product>) => (
        <ProductItem item={itemData.item} onSelect={() => { editProduct(itemData.item) }}>
          <Button color={colors.primary} title="Edit" onPress={() => { editProduct(itemData.item) }} />
          <Button color={colors.primary} title="Delete" onPress={() => deleteHandler(itemData.item.id)} />
        </ProductItem>)}
    />
  )
}

export default UserProducts;
