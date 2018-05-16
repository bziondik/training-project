import { handleActions } from 'redux-actions';

import { authorize, logout } from '../actions/auth';

const initialState = {
  authorized: false,
};

export default handleActions(
  {
    [authorize]: state => ({ ...state, authorized: true }),
    [logout]: state => ({ ...state, authorized: false }),
  },
  initialState,
);

export const getIsAuthorized = state => state.auth.authorized;
