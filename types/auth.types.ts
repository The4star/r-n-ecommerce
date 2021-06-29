export interface IAuthFormState {
  inputValues: IAuthInputState;
  validationValues: IAuthValidationState;
  formIsValid: boolean
}

export interface IAuthInputState {
  "email": string;
  "password": string;
}

export interface IAuthValidationState {
  email: boolean;
  password: boolean;
}