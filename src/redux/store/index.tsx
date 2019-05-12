
import { applyMiddleware, createStore, Store } from 'redux';
import axios from 'axios'

import thunk from 'redux-thunk';

import { rootReducer } from '../reducers';
function configureStore(): Store<any> {
  return createStore(rootReducer, undefined, applyMiddleware(thunk));
 
}
const store = configureStore();

const token = sessionStorage.getItem('jwtToken')
console.log({token})
axios.defaults.headers.common.Authorization = token;


// store.subscribe(() => localStorage.setItem('userState', JSON.stringify(store.getState().userState.user)));
export default store;