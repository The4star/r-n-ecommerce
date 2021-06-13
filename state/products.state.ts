import { AnyAction } from 'redux';
import products from '../data/products';
import Product from '../models/product';
import { IEditInputState } from '../types/admin.types';

export interface IProductsState {
  availableProducts: Product[]
  userProducts: Product[]
}

// INIT STATE
const initialState: IProductsState = {
  availableProducts: products,
  userProducts: products.filter(product => product.ownerId === 'u1')
};

export enum ProductActions {
  CREATE_PRODUCT = "CREATE_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT"
}

// ACTIONS
export const DeleteProduct = (id: number | string): AnyAction => ({ type: ProductActions.DELETE_PRODUCT, data: id });
export const createProduct = (productData: IEditInputState): AnyAction => ({ type: ProductActions.CREATE_PRODUCT, data: productData });
export const updateProduct = (productData: IEditInputState, productId: string): AnyAction => ({ type: ProductActions.UPDATE_PRODUCT, data: productData, productId });

// REDUCER
const productsReducer = (state = initialState, action: AnyAction): IProductsState => {
  const { type, data } = action;
  switch (type) {
    case ProductActions.DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== data),
        availableProducts: state.availableProducts.filter(product => product.id !== data)
      }
    case ProductActions.CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        'u1',
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