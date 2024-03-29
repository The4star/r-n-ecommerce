import { Action, AnyAction, Dispatch } from 'redux';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { authClient, firestoreClient } from '../firebase.config';
import Product from '../models/product';
import { IEditInputState } from '../types/admin.types';

export interface IProductsState {
  availableProducts: Product[]
  userProducts: Product[]
}

// INIT STATE
const initialState: IProductsState = {
  availableProducts: [],
  userProducts: []
};

export enum ProductActions {
  CREATE_PRODUCT = "CREATE_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  SET_PRODUCTS = "SET_PRODUCTS"
}

// ACTIONS
export const DeleteProduct = (id: number | string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    await firestoreClient.collection("products").doc(id as string).delete()
    dispatch({
      type: ProductActions.DELETE_PRODUCT,
      data: id
    })
  }
};
export const createProduct = (productData: IEditInputState) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const id = uuidv4();
      const userId = authClient.currentUser?.uid as string
      await firestoreClient.collection("products").doc(id).set({ ...productData, userId });
      productData.id = id
      dispatch({
        type: ProductActions.CREATE_PRODUCT,
        data: {
          ...productData,
          userId
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
};
export const updateProduct = (productData: IEditInputState, productId: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    await firestoreClient.collection("products").doc(productId).update(productData)
    dispatch({
      type: ProductActions.UPDATE_PRODUCT,
      data: productData, productId
    })
  }
};
export const fetchProducts = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const loadedProducts: Product[] = []
      const userId = authClient.currentUser?.uid as string
      const productsInfirestoreClient = await firestoreClient.collection("products").get();
      productsInfirestoreClient.forEach(product => {
        const productData = product.data();
        loadedProducts.push(new Product(
          product.id,
          productData.userId,
          productData.title,
          productData.imageUrl,
          productData.description,
          parseFloat(productData.price)
        ))
      })

      dispatch({
        type: ProductActions.SET_PRODUCTS,
        data: {
          loadedProducts,
          userId
        }
      })
    } catch (error) {
      throw error
    }
  }
};

// REDUCER
const productsReducer = (state = initialState, action: AnyAction): IProductsState => {
  const { type, data } = action;
  switch (type) {
    case ProductActions.SET_PRODUCTS:
      return {
        ...state,
        availableProducts: data.loadedProducts,
        userProducts: data.loadedProducts.filter((product: Product) => product.ownerId === data.userId)
      }
    case ProductActions.DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== data),
        availableProducts: state.availableProducts.filter(product => product.id !== data)
      }
    case ProductActions.CREATE_PRODUCT:
      const newProduct = new Product(
        data.id,
        data.userId,
        data.title,
        data.imageUrl,
        data.description,
        parseFloat(data.price)
      );
      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct]
      }
    case ProductActions.UPDATE_PRODUCT:
      const updatedAvailableProducts = state.availableProducts.map(product => {
        if (product.id === action.productId) {
          return {
            ...product,
            title: data.title,
            imageUrl: data.imageUrl,
            price: parseFloat(data.price),
            description: data.description
          }
        }
        return product
      })
      const updatedUserProducts = state.userProducts.map(product => {
        if (product.id === action.productId) {
          return {
            ...product,
            title: data.title,
            imageUrl: data.imageUrl,
            price: parseFloat(data.price),
            description: data.description
          }
        }
        return product
      })
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      }
    default:
      return state;
  }
};

export default productsReducer;