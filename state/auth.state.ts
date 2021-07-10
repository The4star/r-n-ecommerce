import { Dispatch, AnyAction } from 'redux';
import { authClient } from '../firebase.config';

export interface IAuthState {
  token: string | null;
  userID: string | null;
}

const initialState: IAuthState = {
  token: null,
  userID: null
}

enum AuthActions {
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN'
}

export const signup = (email: string, password: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const signUpResponse = await authClient.createUserWithEmailAndPassword(email, password);
      dispatch({
        type: AuthActions.SIGNUP,
        data: {
          token: signUpResponse.user?.getIdToken(),
          userID: signUpResponse.user?.uid
        }
      })
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          throw new Error("Email address already in use");
        case "auth/invalid-email":
          throw new Error("Email address is invalid");
        case "auth/weak-password":
          throw new Error("Password is too weak");
        default:
          throw new Error("An error has occurred");
      }
    }
  }
}

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const signInResponse = await authClient.signInWithEmailAndPassword(email, password);
      console.log(signInResponse.user?.uid);
      dispatch({
        type: AuthActions.LOGIN,
        data: {
          token: signInResponse.user?.getIdToken(),
          userID: signInResponse.user?.uid
        }
      })
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          throw new Error("No existing user found");
        case "auth/invalid-email":
          throw new Error("Email address is invalid");
        case "auth/wrong-password":
          throw new Error("Password Incorrect");
        case "auth/user-disabled":
          throw new Error("This account is disabled");
        default:
          throw new Error("An error has occurred");
      }
    }
  }
}

const authReducer = (state = initialState, action: AnyAction): IAuthState => {
  const { type, data } = action
  switch (type) {
    case AuthActions.SIGNUP:
      return {
        token: data.token,
        userID: data.userID
      }
    case AuthActions.LOGIN:
      return {
        token: data.token,
        userID: data.userID
      }
    default:
      return state
  }
}

export default authReducer;