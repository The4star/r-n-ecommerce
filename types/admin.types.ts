export interface IEditFormState {
  inputValues: IEditInputState,
  validationValues: IEditValidationState
  formIsValid: boolean
}

export interface IEditInputState {
  id?: string;
  title: string;
  imageUrl: string;
  price: string;
  description: string
}

export interface IEditValidationState {
  title: boolean;
  imageUrl: boolean;
  price: boolean;
  description: boolean
}
