import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';

interface IBudgetState {
    budget: IBudget
}
export interface IBudget {
    data: object
}

export enum BudgetType {
    ADD_BUDGET_SUCCESS = 'ADD_BUDGET_SUCCESS',
    ADD_BUDGET_FAILURE = 'ADD_BUDGET_FAILURE',
    INITIATE_ADD_BUDGET = 'INITIATE_ADD_BUDGET'
}

export interface BudgetSuccess {
    type : BudgetType.ADD_BUDGET_SUCCESS,
    budget: IBudget
}

export interface BudgetFailure {
    type: BudgetType.ADD_BUDGET_FAILURE,
    error: string
}

export type BudgetAction = BudgetSuccess | BudgetFailure 

export const addBudgetRequest: ActionCreator<
  ThunkAction<Promise<any>, IBudgetState, null, BudgetAction>
> = (data) => {
  return async (dispatch: Dispatch) => {
    try {
      
      const response = await axios.post('http://localhost:5000/api/v1/budget', data );
      dispatch({
        budget: response.data.data,
        type: BudgetType.ADD_BUDGET_SUCCESS
      });
      toast.success('Budget Added successfully')
    }
    catch (error){
        dispatch({
            error,
            type: BudgetType.ADD_BUDGET_FAILURE
          });
          toast.error(error)
          console.error(error);
    }
   }

}