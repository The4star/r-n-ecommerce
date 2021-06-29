import React, { useState } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Text } from 'react-native';
import Card from '../../../components/ui/Card';
import CustomInput from '../../../components/ui/CustomInput';
import { IAuthFormState, IAuthInputState, IAuthValidationState } from '../../../types/auth.types';
import styles from './Authentication.styles';
const Authentication = () => {
  const [formFailedSubmission, setFormFailedSubmission] = useState<boolean>(false)
  const [formState, setFormState] = useState<IAuthFormState>({
    inputValues: {
      email: "",
      password: ""
    },
    validationValues: {
      email: false,
      password: false
    },
    formIsValid: false
  })

  const checkLength = (inputType: keyof IAuthValidationState, text: string, updatedFormState: IAuthFormState) => {
    if (!text.length) {
      updatedFormState.validationValues[inputType] = false
    } else if (!formState.validationValues[inputType]) {
      updatedFormState.validationValues[inputType] = true
    }
  }

  const handleChange = (inputType: string, text: string) => {
    const updatedFormState = formState;
    switch (inputType) {
      case "email":
        checkLength(inputType, text, updatedFormState);
        break;
      case "password":
        checkLength(inputType, text, updatedFormState);
        break;
    }

    let formCompletelyValid = true;
    for (const typeOfInput in formState.validationValues) {
      formCompletelyValid = formCompletelyValid && updatedFormState.validationValues[typeOfInput as keyof IAuthValidationState]
    }
    updatedFormState.formIsValid = formCompletelyValid;
    updatedFormState.inputValues[inputType as keyof IAuthInputState] = text
    setFormState({ ...updatedFormState })
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <Card propStyles={styles.authContainer}>
        <ScrollView>
          <CustomInput
            formFailedSubmission={formFailedSubmission}
            formState={formState}
            inputType="email"
            label="Email"
            errorText="Please enter a valid email"
            changeHandler={handleChange}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <CustomInput
            formFailedSubmission={formFailedSubmission}
            formState={formState}
            inputType="password"
            label="Password"
            errorText="Please enter a valid Password"
            changeHandler={handleChange}
            secureTextEntry
            autoCapitalize="none"
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  )
}

export default Authentication