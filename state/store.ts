import { createStore, combineReducers, applyMiddleware } from 'redux';
import cartReducer, { ICartState } from './cart.state';
import ordersReducer, { IOrderState } from './orders.state';
import productsReducer, { IProductsState } from './products.state';
import ReduxThunk from 'redux-thunk';
import authReducer, { IAuthState } from './auth.state';

export interface ICombinedStates {
  products: IProductsState;
  cart: ICartState
  orders: IOrderState
  auth: IAuthState
}
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
})

const stateStore = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default stateStore;