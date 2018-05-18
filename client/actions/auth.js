import { createActions } from 'redux-actions';

export const { login, logout } = createActions(
  'LOGIN',
  'LOGOUT',
);
