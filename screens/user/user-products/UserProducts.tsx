import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, FlatList, ListRenderItemInfo, Alert } from 'react-native';
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

  const editProduct = (product: Product) => {
    navigation.navigate({
      name: 'EditProduct',
      params: { productID: product.id, productTitle: product.title }
    })
  }

  const deleteHandler = (productId: string) => {
    Alert.alert('Are you sure?', " Do you really want to delete this product?",
      [
        { text: "No", style: 'default' },
        { text: "yes", onPress: () => dispatch(DeleteProduct(productId)), style: "destructive" }
      ]
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
