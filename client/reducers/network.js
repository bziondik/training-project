import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { clearNetworkErrors, networkError, networkShowLoading, networkCloseLoading } from '../actions/network';

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
      if (response && response.data && response.data.message) {
        return response.data.message;
      }
      return 'Network error';
    },
  },
  null,
);

export const isLoading = handleActions(
  {
    [networkShowLoading]: () => true,
    [networkCloseLoading]: () => false,
  },
  false,
);

export default combineReducers({
  error,
  message,
  isLoading,
});

export const getIsNetworkErrorPresent = state => state.network.error != null;
export const getNetworkError = state => state.network.message;
export const getIsLoading = state => state.network.isLoading;
