import { Dispatch, AnyAction } from 'redux';
import { authClient } from '../firebase.config';

export interface IAuthState {
  userId: string | null;
}

const initialState: IAuthState = {
  userId: null
}

enum AuthActions {
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

export const signup = (email: string, password: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const signUpResponse = await authClient.createUserWithEmailAndPassword(email, password);
      const userId = signUpResponse.user?.uid as string
      dispatch({
        type: AuthActions.SIGNUP,
        data: {
          userId
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
      const userId = signInResponse.user?.uid as string
      dispatch({
        type: AuthActions.LOGIN,
        data: {
          userId
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

export const logout = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    await authClient.signOut()
    dispatch({
      type: AuthActions.LOGOUT
    })
  }
}

const authReducer = (state = initialState, action: AnyAction): IAuthState => {
  const { type, data } = action
  switch (type) {
    case AuthActions.SIGNUP:
      return {
        userId: data.userId
      }
    case AuthActions.LOGIN:
      return {
        userId: data.userId
      }
    case AuthActions.LOGOUT:
      return {
        userId: null
      }
    default:
      return state
  }
}

export default authReducer;