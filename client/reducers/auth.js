import { handleActions } from 'redux-actions';

import { register, login, logout } from '../actions/auth';

const initialState = {
  registered: false,
  authorized: false,
};

export default handleActions(
  {
    [register]: state => ({ ...state, registered: true }),
    [login]: state => ({ ...state, authorized: true }),
    [logout]: state => ({ ...state, authorized: false }),
  },
  initialState,
);

export const getIsRegistered = state => state.auth.registered;
export const getIsAuthorized = state => state.auth.authorized;
