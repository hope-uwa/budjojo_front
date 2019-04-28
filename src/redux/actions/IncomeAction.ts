import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';

export interface Income {
    income: number
}
// Define the User State
export interface IncomeState {
    income: Income;
}


export enum IncomeActionType {
    INCOME_SUCCESS = 'INCOME_SUCCESS',
    INCOME_FAILURE = 'INCOME_FAILURE'
}
export interface IncomeSuccess {
    type: IncomeActionType.INCOME_SUCCESS;
    income: number
}

export interface IncomeFailure {
    type: IncomeActionType.INCOME_FAILURE;
    error: string
}

export type IncomeAction = IncomeSuccess | IncomeFailure;
const token = sessionStorage.getItem('jwtToken')
export const incomeRequest: ActionCreator<
  ThunkAction<Promise<any>, IncomeState, null, IncomeAction>
> = (income) => {
    console.warn(income)
  return async (dispatch: Dispatch) => {
    try {
      
      const response = await axios({
        method: 'PUT',
        url: 'http://localhost:5000/api/v1/income',
        headers: { 'authorization': token },
        data: income
      });
      console.log(response)
      dispatch({
        income: response.data.data.income,
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




