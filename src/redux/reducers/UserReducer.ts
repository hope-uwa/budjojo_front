import { Reducer } from 'redux';
import * as jwtDecode from 'jwt-decode';
import {
    UserActions,
    UserActionTypes,
} from '../actions/UserAction';
import {
  IncomeActionType
} from '../actions/IncomeAction'

// Define the User type
export interface IUser {
    income?: number | null;
    id?: number | null;
    username: string;
    email: string; 
    isLoading: false;  
}

// Define the User State
export interface IUserState {
    user: IUser;
}
let initialState: IUserState;
try {
  const token : string | null = sessionStorage.getItem('jwtToken');
  if (token) {
  initialState = jwtDecode(token); 
  } else {
    initialState = {
      user: {
        id: null,
        username: '',
        email: '',
        isLoading: false,
        income: null,
      }
    };  
  }
} catch (error) { /* do nothing */ }
export const userReducer: Reducer<IUserState, UserActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.SIGNUP_BEGIN: {
      return {
        ...state,
        isLoading: true, 
      };
    }
    case UserActionTypes.SIGNUP_ERROR: {
        return {
          ...state,
          error: action.error,
          isLoading: false,
        };
      }
    case UserActionTypes.SIGNUP_SUCCESS: {
        return {
          ...state,
          user: action.payload,
          isLoading: false,
          error: null
        };
      }
    case UserActionTypes.LOGIN_FAILURE: {
        return {
          ...state,
          error: action.error,
          isLoading: false
        };
      }
    case UserActionTypes.LOGIN_SUCCESS: {
        return {
          ...state,
          user: action.payload,
          isLoading: false,
          error: null
        };
      }
    case IncomeActionType.INCOME_SUCCESS : {
      const userState = {...state}
        userState.user.income = action.income
        return {
          ...userState,
          isLoading: true, 
        };
      }
    case IncomeActionType.INCOME_FAILURE: {
          return {
            ...state,
            error: action.error,
            isLoading: false,
          };
        }
      
    default:
      return state;
  }
};