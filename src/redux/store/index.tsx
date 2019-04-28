
import { applyMiddleware, createStore, Store } from 'redux';


import thunk from 'redux-thunk';

import { rootReducer } from '../reducers';
function configureStore(): Store<any> {
  return createStore(rootReducer, undefined, applyMiddleware(thunk));
 
}
const store = configureStore();

store.subscribe(() => localStorage.setItem('userState', JSON.stringify(store.getState().userState.user)));
export default store;