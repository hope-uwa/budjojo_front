import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';


import { IUserState, IUser } from '../reducers/UserReducer';

// Define the User State
export interface IncomeState {
    data: IUserState;
}


export enum IncomeActionType {
    INCOME_SUCCESS = 'INCOME_SUCCESS',
    INCOME_FAILURE = 'INCOME_FAILURE'
}
export interface IncomeSuccess {
    type: IncomeActionType.INCOME_SUCCESS;
    user: IUser
}

export interface IncomeFailure {
    type: IncomeActionType.INCOME_FAILURE;
    error: string
}

export type IncomeAction = IncomeSuccess | IncomeFailure;

export const incomeRequest: ActionCreator<
  ThunkAction<Promise<any>, IncomeState, null, IncomeAction>
> = (income) => {
  return async (dispatch: Dispatch) => {
    try {
      
      const response = await axios.put('http://localhost:5000/api/v1/income', income );
      const {token: newToken, ...payload} = response.data.data
      sessionStorage.setItem('jwtToken', newToken);
      dispatch({
        user: payload,
        type: IncomeActionType.INCOME_SUCCESS
      });
      toast.success('Sign up successfully')
      
    } catch (err) {
      dispatch({
        error: err,
        type: IncomeActionType.INCOME_FAILURE
      });
      toast.error(err)
      console.error(err);
    }
  };
};




