import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AdminParamList } from '../../../types/navigation.types';
import { useDispatch, useSelector } from 'react-redux';
import { ICombinedStates } from '../../../state/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../../components/ui/HeaderButton';

import styles from './EditProduct.styles';

import Product from '../../../models/product';
import { createProduct, updateProduct } from '../../../state/products.state';
import CustomInput from '../../../components/ui/CustomInput';
import { formTitle, IEditFormState } from '../../../types/admin.types';
type EditProductRouteProp = RouteProp<AdminParamList, 'EditProduct'>
type EditProductNavigationProp = StackNavigationProp<AdminParamList, 'EditProduct'>
interface IEditProductProps {
  route: EditProductRouteProp,
  navigation: EditProductNavigationProp
}

const EditProduct = ({ route, navigation }: IEditProductProps) => {
  const dispatch = useDispatch()
  const productID = route.params.productID;
  const existingProduct = !productID ? null : useSelector<ICombinedStates, Product>(state => state.products.availableProducts.find(product => product.id === productID)!);
  const [formState, setFormState] = useState<IEditFormState>({
    inputValues: {
      title: existingProduct ? existingProduct.title : "",
      imageUrl: existingProduct ? existingProduct.imageUrl : "",
      price: existingProduct ? existingProduct.price.toFixed(2) : "",
      description: existingProduct ? existingProduct.description : "",
    },
    validationValues: {
      title: existingProduct ? true : false,
      imageUrl: existingProduct ? true : false,
      price: existingProduct ? true : false,
      description: existingProduct ? true : false,
    },
    formIsValid: existingProduct ? true : false
  })

  const handleChange = (inputType: string, text: string) => {
    setFormState({
      ...formState,
      inputValues: {
        ...formState.inputValues,
        [inputType]: text
      }
    })
  }

  const submitHandler = useCallback(() => {
    if (existingProduct) {
      dispatch(updateProduct(formState.inputValues, existingProduct.id))
    } else {
      dispatch(createProduct(formState.inputValues))
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
        <CustomInput
          formState={formState}
          inputType='title'
          label="Title"
          errorText="Please enter a valid title"
          changeHandler={handleChange}
          otherProps={null}
        />
        <CustomInput
          formState={formState}
          inputType='imageUrl'
          label="Image URL"
          errorText="Please enter a valid Image URL"
          changeHandler={handleChange}
          otherProps={null}
        />
        <CustomInput
          formState={formState}
          inputType='price'
          label="Price"
          errorText="Please enter a valid price"
          changeHandler={handleChange}
          otherProps={null}
        />
        <CustomInput
          formState={formState}
          inputType='description'
          label="Description"
          errorText="Please enter a valid description"
          changeHandler={handleChange}
          otherProps={null}
        />
      </View>
    </ScrollView>
  )


}

export default EditProduct
