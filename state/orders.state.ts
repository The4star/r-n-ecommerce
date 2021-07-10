import { AnyAction, Dispatch } from 'redux';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { authClient, firestoreClient } from '../firebase.config';
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
  SET_ORDERS = 'SET_ORDERS'
}

// ACTIONS
export const addOrder = (cartItems: CartItem[], totalAmount: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    // change to dynamic user
    const orderId = uuidv4();
    const orderDate = new Date();
    const formattedCartItems = cartItems.map((cartItem: CartItem) => {
      return {
        id: cartItem.id,
        quantity: cartItem.quantity,
        productPrice: cartItem.productPrice,
        productTitle: cartItem.productTitle,
        sum: cartItem.sum,
      }
    })
    const userId = authClient.currentUser?.uid
    await firestoreClient.collection('users').doc(userId).collection("orders").doc(orderId).set({
      orderId,
      cartItems: formattedCartItems,
      totalAmount,
      date: orderDate.toISOString()
    });

    dispatch({
      type: OrderActions.ADD_ORDER,
      data: { orderItems: cartItems, orderAmount: totalAmount, orderId, orderDate }
    })
  }
};

export const fetchOrders = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const loadedOrders: Order[] = []
      const userId = authClient.currentUser?.uid
      const ordersInDb = await firestoreClient.collection("users").doc(userId).collection("orders").get();
      ordersInDb.forEach(order => {
        const orderData = order.data();
        loadedOrders.push(new Order(
          orderData.orderId,
          orderData.cartItems,
          orderData.totalAmount,
          new Date(orderData.date)
        ))
      })

      dispatch({
        type: OrderActions.SET_ORDERS,
        data: loadedOrders
      })
    } catch (error) {
      throw error
    }
  }
}

// REDUCER
const ordersReducer = (state = initialState, action: AnyAction): IOrderState => {
  const { type, data } = action;
  switch (type) {
    case OrderActions.SET_ORDERS:
      return {
        ...state,
        orders: data
      }
    case OrderActions.ADD_ORDER:
      const newOrder = new Order(
        data.orderId,
        data.orderItems,
        data.orderAmount,
        data.orderDate
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