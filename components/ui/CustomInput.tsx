import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

import { IEditFormState, IEditInputState, IEditValidationState } from '../../types/admin.types';
import { IAuthFormState, IAuthInputState, IAuthValidationState } from '../../types/auth.types';

interface ICustomInputProps {
  inputType: string
  label: string
  errorText: string;
  changeHandler: (inputType: string, text: string) => void
  formState: IEditFormState | IAuthFormState;
  formFailedSubmission: boolean;
  [x: string]: any | TextInputProps;
}

const CustomInput = ({ inputType, label, errorText, changeHandler, formState, formFailedSubmission, ...otherProps }: ICustomInputProps) => {
  const [inputTouched, setInputTouched] = useState<boolean>(false)

  useEffect(() => {
    if (formFailedSubmission && !inputTouched) {
      setInputTouched(true)
    }
  }, [formFailedSubmission])
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={formState.inputValues[inputType as keyof IEditInputState & keyof IAuthFormState]}
        onChangeText={(text) => changeHandler(inputType, text)}
        onBlur={() => setInputTouched(true)}
        {...otherProps}
      />
      {
        !formState.validationValues[inputType as keyof IEditValidationState & keyof IAuthValidationState] && inputTouched ?
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
