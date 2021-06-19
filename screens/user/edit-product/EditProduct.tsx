import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AdminParamList } from '../../../types/navigation.types';
import { useDispatch, useSelector } from 'react-redux';
import { ICombinedStates } from '../../../state/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../../components/ui/HeaderButton';
import validate from 'validate.js';

import styles from './EditProduct.styles';

import Product from '../../../models/product';
import { createProduct, updateProduct } from '../../../state/products.state';
import CustomInput from '../../../components/ui/CustomInput';
import { IEditFormState, IEditInputState, IEditValidationState } from '../../../types/admin.types';
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
  const [formFailedSubmission, setFormFailedSubmission] = useState<boolean>(false)
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

  const checkLength = (inputType: keyof IEditValidationState, text: string, updatedFormState: IEditFormState) => {
    if (!text.length) {
      updatedFormState.validationValues[inputType] = false
    } else if (!formState.validationValues[inputType]) {
      updatedFormState.validationValues[inputType] = true
    }
  }

  const handleChange = (inputType: string, text: string) => {
    const updatedFormState = formState;
    switch (inputType) {
      case "title":
        checkLength(inputType, text, updatedFormState);
        break;
      case "description":
        checkLength(inputType, text, updatedFormState);
        break;
      case "price":
        const validation = validate.single(text, { presence: true, numericality: true })
        if (validation && validation.length) {
          updatedFormState.validationValues[inputType] = false
        } else if (!formState.validationValues[inputType]) {
          {
            updatedFormState.validationValues[inputType] = true
          }
        }
        break;
      case "imageUrl":
        checkLength(inputType, text, updatedFormState);
        break;
      default:
        break;
    }

    let formCompletelyValid = true;
    for (const typeOfInput in formState.validationValues) {
      formCompletelyValid = formCompletelyValid && updatedFormState.validationValues[typeOfInput as keyof IEditValidationState]
    }
    updatedFormState.formIsValid = formCompletelyValid;
    updatedFormState.inputValues[inputType as keyof IEditInputState] = text
    setFormState({ ...updatedFormState })
  }

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      setFormFailedSubmission(true)
      Alert.alert('Submission invalid', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
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
          formFailedSubmission={formFailedSubmission}
          inputType='title'
          label="Title"
          errorText="Please enter a valid title"
          changeHandler={handleChange}

        />
        <CustomInput
          formState={formState}
          formFailedSubmission={formFailedSubmission}
          inputType='imageUrl'
          label="Image URL"
          errorText="Please enter a valid Image URL"
          changeHandler={handleChange}

        />
        <CustomInput
          formState={formState}
          formFailedSubmission={formFailedSubmission}
          inputType='price'
          label="Price"
          errorText="Please enter a valid price"
          changeHandler={handleChange}
          keyboardType="numeric"
        />
        <CustomInput
          formState={formState}
          formFailedSubmission={formFailedSubmission}
          inputType='description'
          label="Description"
          errorText="Please enter a valid description"
          changeHandler={handleChange}
          multiline
          numberOfLines={4}
        />
      </View>
    </ScrollView>
  )
}

export default EditProduct
