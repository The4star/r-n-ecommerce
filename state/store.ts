import { createStore, combineReducers } from 'redux';
import cartReducer, { ICartState } from './cart.state';
import ordersReducer, { IOrderState } from './orders.state';
import productsReducer, { IProductsState } from './products.state';

export interface ICombinedStates {
  products: IProductsState;
  cart: ICartState
  orders: IOrderState
}
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
})

const stateStore = createStore(rootReducer);

export default stateStore;