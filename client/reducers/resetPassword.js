import { handleActions } from 'redux-actions';

import {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordError,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordError,
} from '../actions/resetPassword';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
};

export default handleActions(
  {
    [resetPasswordRequest]: state => ({
      ...state,
      isFetching: true,
      isFetched: false,
    }),
    [resetPasswordSuccess]: state => ({
      ...state,
      isFetching: false,
      isFetched: true,
    }),
    [resetPasswordError]: state => ({
      ...state,
      isFetching: false,
      isFetched: true,
    }),
    [forgotPasswordRequest]: state => ({
      ...state,
      isFetching: true,
      isFetched: false,
    }),
    [forgotPasswordSuccess]: state => ({
      ...state,
      isFetching: false,
      isFetched: true,
    }),
    [forgotPasswordError]: state => ({
      ...state,
      isFetching: false,
      isFetched: true,
    }),
  },
  initialState,
);
