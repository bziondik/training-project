import { handleActions } from 'redux-actions';

import * as actions from '../actions/users';

const initialState = {
  all: [],
  current: null,
};

export default handleActions(
  {
    [actions.usersRequest]: state => ({
      ...state,
      all: [],
    }),
    [actions.usersSuccess]: (state, action) => ({
      ...state,
      all: action.payload,
    }),
    [actions.userGetRequest]: state => ({
      ...state,
      current: null,
    }),
    [actions.userGetSuccess]: (state, action) => ({
      ...state,
      current: action.payload,
    }),
    [actions.userCreateRequest]: state => ({
      ...state,
      current: null,
    }),
    [actions.userCreateSuccess]: (state, action) => ({
      ...state,
      all: action.payload,
    }),
    [actions.userUpdateRequest]: state => ({
      ...state,
      current: null,
    }),
    [actions.userUpdateSuccess]: (state, action) => ({
      ...state,
      all: action.payload,
    }),
    [actions.userDeleteSuccess]: (state, action) => ({
      ...state,
      all: action.payload,
    }),
  },
  initialState,
);
