import { call, takeEvery } from 'redux-saga/effects';

import * as actions from '../actions/users';
import requestFlow from './request';
import {
  getUsersApi,
  getUserApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from './api';

function* usersFlow() {
  yield call(
    requestFlow,
    getUsersApi,
    {
      actionSuccess: actions.usersSuccess,
      actionError: actions.usersError,
    },
  );
}
function* userGetFlow() {
  yield call(
    requestFlow,
    getUserApi,
    {
      actionSuccess: actions.userGetSuccess,
      actionError: actions.userGetError,
    },
  );
}
function* userCreateFlow() {
  yield call(
    requestFlow,
    createUserApi,
    {
      actionSuccess: actions.userCreateSuccess,
      actionError: actions.userCreateError,
    },
  );
}
function* userUpdateFlow() {
  yield call(
    requestFlow,
    updateUserApi,
    {
      actionSuccess: actions.userUpdateSuccess,
      actionError: actions.userUpdateError,
    },
  );
}
function* userDeleteFlow() {
  yield call(
    requestFlow,
    deleteUserApi,
    {
      actionSuccess: actions.userDeleteSuccess,
      actionError: actions.userDeleteError,
    },
  );
}

function* usersWatcher() {
  yield takeEvery(actions.usersRequest, usersFlow);
  yield takeEvery(actions.userGetRequest, userGetFlow);
  yield takeEvery(actions.userCreateRequest, userCreateFlow);
  yield takeEvery(actions.userUpdateRequest, userUpdateFlow);
  yield takeEvery(actions.userDeleteRequest, userDeleteFlow);
}

export default usersWatcher;
