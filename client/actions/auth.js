import { createAction } from 'redux-actions';

export const loginRequest = createAction('LOGIN_REQUESTING');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginError = createAction('LOGIN_ERROR');

export const logoutRequest = createAction('LOGOUT_REQUESTING');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');
export const logoutError = createAction('LOGOUT_ERROR');

// export const { login, logout } = createActions(
//   'LOGIN',
//   'LOGOUT',
// );
