import { AnyAction } from 'redux';
import CartItem from '../models/cart-item';
import Product from '../models/product';
import { ICartItems } from '../types/cart.types';
import { OrderActions } from './orders.state';
import { ProductActions } from './products.state';

export interface ICartState {
  items: ICartItems,
  totalAmount: number
}

// INIT STATE
const initialState: ICartState = {
  items: {},
  totalAmount: 0
};

enum CartActions {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART'
}

// ACTIONS
export const addItemToCart = (product: Product): AnyAction => ({ type: CartActions.ADD_TO_CART, data: product });
export const removeItemFromCart = (item: CartItem): AnyAction => ({ type: CartActions.REMOVE_FROM_CART, data: item });

// REDUCER
const cartReducer = (state = initialState, action: AnyAction): ICartState => {
  const { type, data } = action;
  switch (type) {
    case CartActions.ADD_TO_CART:
      const addedProduct = data as Product;
      let updatedOrNewCartItem
      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(addedProduct.id, state.items[addedProduct.id].quantity + 1, addedProduct.price, addedProduct.title, state.items[addedProduct.id].sum + addedProduct.price)
      } else {
        updatedOrNewCartItem = new CartItem(addedProduct.id, 1, addedProduct.price, addedProduct.title, addedProduct.price);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + addedProduct.price
      }
    case CartActions.REMOVE_FROM_CART:
      const productToUpdate = state.items[data.id]

      if (productToUpdate.quantity > 1) {
        return {
          ...state,
          items: {
            ...state.items,
            [productToUpdate.id]: {
              ...productToUpdate,
              quantity: productToUpdate.quantity - 1,
              sum: productToUpdate.sum - productToUpdate.productPrice

            }
          },
          totalAmount: state.totalAmount - productToUpdate.productPrice
        }
      } else {
        const updatedItems = state.items
        delete updatedItems[productToUpdate.id]
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - productToUpdate.productPrice
        }
      }
    case OrderActions.ADD_ORDER:
      return initialState
    case ProductActions.DELETE_PRODUCT:
      if (!state.items[data]) {
        return state
      } else {
        const updatedItems = state.items;
        const itemTotal = state.items[data].sum;
        delete updatedItems[data]
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - itemTotal
        }
      }
    default:
      return state;
  }
};

export default cartReducer;