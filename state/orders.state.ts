import { AnyAction } from 'redux';
import CartItem from '../models/cart-item';
import Order from '../models/order';

export interface IOrderState {
  orders: Order[]
}

// INIT STATE
const initialState: IOrderState = {
  orders: []
};

export enum OrderActions {
  ADD_ORDER = 'ADD_ORDER',
}

// ACTIONS
export const addOrder = (cartItems: CartItem[], totalAmount: number): AnyAction => ({ type: OrderActions.ADD_ORDER, data: { orderItems: cartItems, orderAmount: totalAmount } });

// REDUCER
const ordersReducer = (state = initialState, action: AnyAction): IOrderState => {
  const { type, data } = action;
  switch (type) {
    case OrderActions.ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        data.orderItems,
        data.orderAmount,
        new Date()
      );

      return {
        ...state,
        orders: [...state.orders, newOrder]
      }
    default:
      return state;
  }
};

export default ordersReducer;