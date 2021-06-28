import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, ListRenderItemInfo, Alert, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../../components/shop/product-item/ProductItem';
import colors from '../../../constants/colors';
import Product from '../../../models/product';
import { DeleteProduct } from '../../../state/products.state';
import { ICombinedStates } from '../../../state/store';
import { AdminParamList } from '../../../types/navigation.types';

type UserProductsNavigationProp = StackNavigationProp<AdminParamList, 'UserProducts'>

interface IUserProductsProps {
  navigation: UserProductsNavigationProp
}

const UserProducts = ({ navigation }: IUserProductsProps) => {
  const dispatch = useDispatch()
  const userProducts = useSelector<ICombinedStates, Product[]>(state => state.products.userProducts)
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        { text: "yes", onPress: () => DeleteProduct(productId), style: "destructive" }
      ]
    )
  }

  useEffect(() => {
    if (error) {
      Alert.alert("An error has occured", error, [{ text: "Okay" }])
    }
  }, [error])

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <FlatList data={userProducts} renderItem={(itemData: ListRenderItemInfo<Product>) => (
      <ProductItem item={itemData.item} onSelect={() => { editProduct(itemData.item) }}>
        <Button color={colors.primary} title="Edit" onPress={() => { editProduct(itemData.item) }} />
        <Button color={colors.primary} title="Delete" onPress={() => deleteHandler(itemData.item.id)} />
      </ProductItem>)}
    />
  )
}

export default UserProducts;
