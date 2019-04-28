// Define the user type
export interface User {
    id: string;
    username: string;
    email: string;
    error: string;
  }
// Create Action Constants
export enum SignUpActionTypes {
    SIGNUP_BEGIN = 'SIGNUP_BEGIN',
    SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
    SIGNUP_ERROR = 'SIGNUP_ERROR',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE'
  }


// Interface for Get All Action Type
export interface ISignUpBegin {
    type: SignUpActionTypes.SIGNUP_BEGIN
  }
export interface ISignUpSuccess {
    type: SignUpActionTypes.SIGNUP_SUCCESS;
    payload: {
        data: object,
        message: object
    }
}
export interface ISignUpError {
    type: SignUpActionTypes.SIGNUP_ERROR;
    payload: string;
}

/* 
Combine the action types with a union IGetAllAction | IGetOneAction ... 
*/
export type SignupActions = ISignUpBegin | ISignUpSuccess | ISignUpError;
