// Import redux types
import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';


// Import Character Typing
import { IUser, IUserState } from '../reducers/UserReducer';
import { IncomeAction} from './IncomeAction';

// Create Action Constants
export enum UserActionTypes {
  SIGNUP_BEGIN = 'SIGNUP_BEGIN',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_ERROR = 'SIGNUP_ERROR',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
}

// Interface for Get All Action Type
export interface ISignupBegin {
  type: UserActionTypes.SIGNUP_BEGIN;
}
export interface ISignupSuccess {
  type: UserActionTypes.SIGNUP_SUCCESS;
  payload: IUser;
}
export interface ISignupError {
  type: UserActionTypes.SIGNUP_ERROR;
  error: string;
}

export interface ILoginSuccess {
  type: UserActionTypes.LOGIN_SUCCESS;
  payload: IUser;
}

export interface ILoginError {
  type: UserActionTypes.LOGIN_FAILURE;
  error: string;
}


/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type UserActions = ISignupBegin | ISignupError | ISignupSuccess | ILoginSuccess | ILoginError | IncomeAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const signupRequest: ActionCreator<
  ThunkAction<Promise<any>, IUserState, null, UserActions>
> = (user) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: UserActionTypes.SIGNUP_BEGIN
      })
      const response = await axios.post('http://localhost:5000/api/v1/auth/signup', user);
      const  {token, ...payload} = response.data.data[0]
      sessionStorage.setItem('jwtToken', token);
      dispatch({
        payload,
        type: UserActionTypes.SIGNUP_SUCCESS,
      });
      sessionStorage.setItem('jwtToken', response.data.data[0].token);
      toast.success('Sign up successfully')
      
    } catch (err) {
      dispatch({
        error: err,
        type: UserActionTypes.SIGNUP_ERROR,
      });
      toast.error(err)
      console.error(err);
    }
  };
};
export const loginRequest: ActionCreator<ThunkAction<Promise<any>, IUserState, null, UserActions>
> = (user) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UserActionTypes.SIGNUP_BEGIN
    })
    try{
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', user);
      const  {token, ...payload} = response.data.data[0]
      sessionStorage.setItem('jwtToken', token);
      dispatch({
        payload,
        type: UserActionTypes.LOGIN_SUCCESS
      })
      toast.success('Sign up successfully')
    }catch(error){
      dispatch({
        error,
        type: UserActionTypes.LOGIN_FAILURE,
      });
      toast.error(error)
      console.error(error);
    }
  }
}
