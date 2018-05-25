import { createAction } from 'redux-actions';

export const loginRequest = createAction('LOGIN_REQUESTING');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginError = createAction('LOGIN_ERROR');

export const logout = createAction('LOGOUT');
