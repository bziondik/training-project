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
  isLoginFetching: false,
  isLoginFetched: false,
  isLogoutFetching: false,
  isLogoutFetched: false,
  error: null,
  user: null,
};

export default handleActions(
  {
    [loginRequest]: state => ({
      ...state,
      isLoginFetching: true,
      isLoginFetched: false,
    }),
    [loginSuccess]: (state, action) => {
      if (state.isLoginFetching) { // if request not cancelled by logout
        return ({
          ...state,
          isLoginFetching: false,
          isLoginFetched: true,
          user: action.payload,
        });
      }
      return ({
        ...state,
        isLoginFetching: false,
        isLoginFetched: false,
        user: null,
      });
    },
    [loginError]: (state, action) => ({
      ...state,
      isLoginFetching: false,
      isLoginFetched: false,
      error: action.payload,
    }),
    [logoutRequest]: state => ({
      ...state,
      isLoginFetching: false, // cancelled login request
      isLogoutFetching: true,
      isLogoutFetched: false,
    }),
    [logoutSuccess]: state => ({
      ...state,
      isFetcisLogoutFetchinghing: false,
      isLogoutFetched: true,
      user: null,
    }),
    [logoutError]: (state, action) => ({
      ...state,
      isLogoutFetching: false,
      isLogoutFetched: false,
      error: action.payload,
      user: null,
    }),
  },
  initialState,
);

export const getIsAuthorized = state => state.auth.user !== null;
