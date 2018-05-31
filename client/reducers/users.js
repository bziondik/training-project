import { handleActions } from 'redux-actions';

import * as actions from '../actions/users';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  all: [],
  current: null,
};

export default handleActions(
  {
    [actions.usersRequest]: state => ({
      ...state,
      isFetching: true,
      isFetched: false,
      error: null,
      all: [],
    }),
    [actions.usersSuccess]: (state, action) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      all: action.payload,
    }),
    [actions.usersError]: (state, action) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      error: action.payload,
    }),
    [actions.userGetRequest]: state => ({
      ...state,
      isFetching: true,
      isFetched: false,
      error: null,
      current: null,
    }),
    [actions.userGetSuccess]: (state, action) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      current: action.payload,
    }),
    [actions.userGetError]: (state, action) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      error: action.payload,
    }),
    [actions.userCreateRequest]: state => ({
      ...state,
      isFetching: true,
      isFetched: false,
      error: null,
      current: null,
    }),
    [actions.userCreateSuccess]: (state, action) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      current: action.payload,
    }),
    [actions.userCreateError]: (state, action) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      error: action.payload,
    }),
    [actions.userUpdateRequest]: state => ({
      ...state,
      isFetching: true,
      isFetched: false,
      error: null,
    }),
    [actions.userUpdateSuccess]: (state, action) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      all: action.payload,
    }),
    [actions.userUpdateError]: (state, action) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      error: action.payload,
    }),
    [actions.userDeleteRequest]: state => ({
      ...state,
      isFetching: true,
      isFetched: false,
      error: null,
    }),
    [actions.userDeleteSuccess]: (state, action) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      all: action.payload,
      current: null,
    }),
    [actions.userDeleteError]: (state, action) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      error: action.payload,
    }),
  },
  initialState,
);
