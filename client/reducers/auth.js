import { handleActions } from 'redux-actions';

import {
  loginRequest,
  loginSuccess,
  loginError,
  logout,
} from '../actions/auth';

const initialState = {
  isLoginFetching: false,
  isLoginFetched: false,
  isLoginCanceled: false,
  user: null,
  error: null,
};

export default handleActions(
  {
    [loginRequest]: state => ({
      ...state,
      isLoginFetching: true,
      isLoginFetched: false,
      isLoginCanceled: false,
    }),
    [loginSuccess]: (state, action) => {
      if (!state.isLoginCanceled) { // if request not cancelled by logout
        return ({
          ...state,
          isLoginFetching: false,
          isLoginFetched: true,
          user: action.payload,
        });
      }
      return ({
        ...state,
        isLoginCanceled: false,
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
    [logout]: state => ({
      ...state,
      isLoginCanceled: state.isLoginFetching, // cancelled login request
      isLoginFetching: false, // cancelled login request
      user: null,
    }),
  },
  initialState,
);

export const getIsAuthorized = state => state.auth.user !== null;
export const getUserToken = state => (state.auth.user ? state.auth.user.access_token : '');
export const getIsRemberMe = state => state.auth.isRememberMe;
