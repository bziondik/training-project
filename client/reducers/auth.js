import { handleActions } from 'redux-actions';

import {
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
} from '../actions/auth';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  authorized: false,
};

export default handleActions(
  {
    [loginRequest]: state => ({
      ...state,
      isFetching: true,
      isFetched: false,
    }),
    [loginSuccess]: state => ({
      ...state,
      isFetching: false,
      isFetched: true,
      authorized: true,
    }),
    [loginError]: (state, action) => ({
      ...state,
      isFetching: false,
      isFetched: false,
      error: action.payload,
    }),
    [logoutRequest]: state => ({
      ...state,
      isFetching: true,
      isFetched: false,
    }),
    [logoutSuccess]: state => ({
      ...state,
      isFetching: false,
      isFetched: true,
      authorized: false,
    }),
    [logoutError]: (state, action) => ({
      ...state,
      isFetching: false,
      isFetched: false,
      error: action.payload,
      authorized: false,
    }),
  },
  initialState,
);

export const getIsAuthorized = state => state.auth.authorized;
