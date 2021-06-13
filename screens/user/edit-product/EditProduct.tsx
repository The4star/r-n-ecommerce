import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AdminParamList } from '../../../types/navigation.types';
import { useDispatch, useSelector } from 'react-redux';
import { ICombinedStates } from '../../../state/store';
import { IEditFormState } from '../../../types/admin.types';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../../components/ui/HeaderButton';

import styles from './EditProduct.styles';

import Product from '../../../models/product';
import { createProduct, updateProduct } from '../../../state/products.state';
type EditProductRouteProp = RouteProp<AdminParamList, 'EditProduct'>
type EditProductNavigationProp = StackNavigationProp<AdminParamList, 'EditProduct'>
interface IEditProductProps {
  route: EditProductRouteProp,
  navigation: EditProductNavigationProp
}

const EditProduct = ({ route, navigation }: IEditProductProps) => {
  const dispatch = useDispatch()
  const productID = route.params.productID;
  const createMode = !productID
  const existingProduct = createMode ? null : useSelector<ICombinedStates, Product>(state => state.products.availableProducts.find(product => product.id === productID)!);
  const [formState, setFormState] = useState<IEditFormState>(existingProduct ?
    {
      title: existingProduct.title,
      imageUrl: existingProduct.imageUrl,
      price: existingProduct.price.toFixed(2),
      description: existingProduct.description,
    }
    :
    {
      title: "",
      imageUrl: "",
      price: "",
      description: "",
    }
  )

  const submitHandler = useCallback(() => {
    if (existingProduct) {
      dispatch(updateProduct(formState, existingProduct.id))

    } else {
      dispatch(createProduct(formState))
    }
    navigation.goBack()
  }, [dispatch, formState])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Save" iconName='ios-checkmark' onPress={() => {
            submitHandler()
          }} />
        </HeaderButtons>
      )
    })

  }, [submitHandler])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={formState.title} onChangeText={(text) => setFormState({ ...formState, title: text })} />
        </View>
        <View>
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} value={formState.imageUrl} onChangeText={(text) => setFormState({ ...formState, imageUrl: text })} />
        </View>
        <View>
          <Text style={styles.label}>Price</Text>
          <TextInput style={styles.input} value={formState.price} onChangeText={(text) => setFormState({ ...formState, price: text })} />
        </View>
        <View>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} value={formState.description} onChangeText={(text) => setFormState({ ...formState, description: text })} />
        </View>
      </View>
    </ScrollView>
  )


}

export default EditProduct
