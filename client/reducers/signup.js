import { handleActions } from 'redux-actions';

import { signupRequest, signupSuccess, signupError } from '../actions/signup';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
};

export default handleActions(
  {
    [signupRequest]: state => ({
      ...state,
      isFetching: true,
      isFetched: false,
      error: null,
    }),
    [signupSuccess]: state => ({
      ...state,
      isFetching: false,
      isFetched: true,
      error: null,
    }),
    [signupError]: (state, action) => ({
      ...state,
      isFetching: true,
      isFetched: false,
      error: action.payload,
    }),
  },
  initialState,
);
