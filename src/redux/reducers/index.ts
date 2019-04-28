import { combineReducers } from "redux";

import {
  userReducer,
  IUserState
} from './UserReducer';

// Create an interface for the application state
export interface IAppState {
  userState: IUserState;
}

// Create the root reducer
export const rootReducer = combineReducers<IAppState>({
  userState: userReducer
});

