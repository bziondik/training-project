import { createActions } from 'redux-actions';

export const {
  clearNetworkErrors,
  networkError,
  networkShowLoading,
  networkCloseLoading,
} = createActions(
  'CLEAR_NETWORK_ERRORS',
  'NETWORK_ERROR',
  'NETWORK_SHOW_LOADING',
  'NETWORK_CLOSE_LOADING',
);
