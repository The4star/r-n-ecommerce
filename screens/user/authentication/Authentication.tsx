import React, { useState } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../../../components/ui/Card';
import CustomInput from '../../../components/ui/CustomInput';
import colors from '../../../constants/colors';
import { IAuthFormState, IAuthInputState, IAuthValidationState } from '../../../types/auth.types';
import styles from './Authentication.styles';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../../state/auth.state';

const Authentication = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formFailedSubmission, setFormFailedSubmission] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
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

  const handleSubmission = async () => {
    try {
      if (!formState.formIsValid) {
        setFormFailedSubmission(true)
        Alert.alert('Submission invalid', 'Please check the errors in the form.', [
          { text: 'Okay' }
        ]);
        return;
      }

      setIsLoading(true);
      if (isSignUp) {
        await dispatch(signup(formState.inputValues.email, formState.inputValues.password));
      } else {
        await dispatch(login(formState.inputValues.email, formState.inputValues.password));
      }
    } catch (error) {
      setIsLoading(false)
      setFormError(error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
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
            <View style={styles.buttonSection} >
              {
                isLoading ?
                  <ActivityIndicator size="small" color={colors.primary} />
                  :
                  <Button title={isSignUp ? "Sign Up" : "Log in"} color={colors.primary} onPress={() => handleSubmission()} />
              }
              <Button title={`Switch To ${isSignUp ? "Log in" : "Sign Up"}`} color={colors.accent} onPress={() => setIsSignUp(!isSignUp)} />
            </View>
            {
              formError ?
                <Text style={styles.errorText}>{formError}</Text>
                : null
            }
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView >
  )
}

export default Authentication
