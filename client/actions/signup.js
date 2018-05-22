import { createAction } from 'redux-actions';

export const signupRequest = createAction('SIGNUP_REQUESTING');
export const signupSuccess = createAction('SIGNUP_SUCCESS');
export const signupError = createAction('SIGNUP_ERROR');


// export const { signupRequest, signupSuccess, signupError } = createActions(
//   'SIGNUP_REQUESTING',
//   'SIGNUP_SUCCESS',
//   'SIGNUP_ERROR',
// );
