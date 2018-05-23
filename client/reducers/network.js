import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { clearNetworkErrors, networkError } from '../actions/network';

export const error = handleActions(
  {
    [clearNetworkErrors]: () => null,
    [networkError]: (state, action) => action.payload,
  },
  null,
);

export const message = handleActions(
  {
    [clearNetworkErrors]: () => null,
    [networkError]: (state, action) => {
      const { payload: { response } } = action;
      if (response) {
        return response.data.message;
      }
      return 'Network error';
    },
  },
  null,
);

export default combineReducers({
  error,
  message,
});

export const getIsNetworkErrorPresent = state => state.network.error != null;
export const getNetworkError = state => state.network.message;
