import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { formTitle, IEditFormState } from '../../types/admin.types';

interface ICustomInputProps {
  inputType: formTitle
  label: string
  errorText: string;
  changeHandler: (inputType: string, text: string) => void
  formState: IEditFormState
  otherProps: any
}

const CustomInput = ({ inputType, label, errorText, changeHandler, formState, otherProps }: ICustomInputProps) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...otherProps}
        style={styles.input}
        value={formState.inputValues[inputType]}
        onChangeText={(text) => changeHandler(inputType, text)}
      />
      {
        !formState.validationValues[inputType] ?
          <Text style={styles.errorText}> {errorText}</Text>
          : null
      }
    </View >
  )
}

const styles = StyleSheet.create({
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  errorText: {
    marginVertical: 10,
    color: 'red'
  }
})

export default CustomInput
