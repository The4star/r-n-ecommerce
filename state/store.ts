import { createStore, combineReducers, applyMiddleware } from 'redux';
import cartReducer, { ICartState } from './cart.state';
import ordersReducer, { IOrderState } from './orders.state';
import productsReducer, { IProductsState } from './products.state';
import ReduxThunk from 'redux-thunk';

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

const stateStore = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default stateStore;