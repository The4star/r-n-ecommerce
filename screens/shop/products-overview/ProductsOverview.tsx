import React from 'react'
import { Button, FlatList, ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../../components/shop/product-item/ProductItem';
import Product from '../../../models/product';
import { ICombinedStates } from '../../../state/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductParamList } from '../../../types/navigation.types';
import { addItemToCart } from '../../../state/cart.state';
import colors from '../../../constants/colors';

type ProductOverviewNavigationProp = StackNavigationProp<ProductParamList, 'Products'>

interface IProductOverviewProps {
  navigation: ProductOverviewNavigationProp
}

const ProductsOverview = ({ navigation }: IProductOverviewProps) => {
  const dispatch = useDispatch()
  const products = useSelector<ICombinedStates, Product[]>(state => state.products.availableProducts);

  const viewDetails = (product: Product) => {
    navigation.navigate({
      name: 'ProductDetails',
      params: { productID: product.id, productTitle: product.title }
    })
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
