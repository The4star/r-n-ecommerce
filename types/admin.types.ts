export interface IEditFormState {
  inputValues: IEditInputState,
  validationValues: IEditValidationState
  formIsValid: boolean
}

export interface IEditInputState {
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

export type formTitle = "title" | "imageUrl" | "price" | "description"
