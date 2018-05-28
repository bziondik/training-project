import { call, take, cancel, fork, cancelled, put, select } from 'redux-saga/effects';

import {
  loginRequest,
  loginSuccess,
  loginError,
  logout,
} from '../actions/auth';
import requestFlow from './request';
import {
  setTokenApi,
  clearTokenApi,
  loginApi,
  authFromTokenApi,
} from './api';
import { signupSuccess } from '../actions/signup';
import { getIsAuthorized, getUserToken } from '../reducers/auth';
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from '../localStorage';

function* authorize(actionLogin) {
  let isRemember = false;
  let taskLogin;
  try {
    if (actionLogin.type === loginRequest.toString()) {
      isRemember = actionLogin.payload.remember;
      taskLogin = yield fork(
        requestFlow,
        loginApi,
        {
          actionSuccess: loginSuccess,
          actionError: loginError,
          data: actionLogin.payload,
        },
      );
      yield take(loginSuccess);
    } else { // signupSuccess
      yield put(loginSuccess(actionLogin.payload));
    }
    const token = yield select(getUserToken);
    yield call(setTokenApi, token);
    if (isRemember) {
      yield call(setTokenToLocalStorage, token);
    }
  } finally {
    if (yield cancelled()) {
      if (taskLogin) {
        yield cancel(taskLogin);
      }
      console.log('authorize cancelled');
    }
  }
}

function* loginFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);
    let task;
    let token;

    if (!isAuthorized) {
      if (localStorageToken) {
        token = localStorageToken;
        yield call(setTokenApi, token);
        yield fork(
          requestFlow,
          authFromTokenApi,
          {
            actionSuccess: loginSuccess,
          },
        );
      } else {
        const actionLogin = yield take([loginRequest, signupSuccess]);
        task = yield fork(authorize, actionLogin);
      }
    }
    console.log('saga loginFlow before take([logout, loginError]);');
    const action = yield take([logout, loginError]);
    console.log('saga loginFlow after take([logout, loginError]); action=', action);
    if (task) {
      yield cancel(task);
    }
    if (action.type === logout.toString()) {
      yield call(removeTokenFromLocalStorage);
      yield call(clearTokenApi);
    }
  }
}

export default loginFlow;
