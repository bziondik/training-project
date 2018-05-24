import axios from 'axios';
import { call, take, cancel, fork, cancelled, put, select } from 'redux-saga/effects';

import {
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
} from '../actions/auth';
import requestFlow from './request';
import { loginUrl, logoutUrl, authFromTokenUrl } from './api';
import { signupSuccess } from '../actions/signup';
import { getIsAuthorized, getUserToken } from '../reducers/auth';
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from '../localStorage';

function loginApi(data) {
  console.log('loginApi data=', data);
  return axios.post(loginUrl, data);
}
function logoutApi() {
  console.log('logoutApi');
  return axios.post(logoutUrl);
}
function authFromTokenApi() {
  console.log('authFromTokenApi');
  return axios.post(authFromTokenUrl);
}

function* authorize(actionLogin) {
  try {
    if (actionLogin.type === loginRequest.toString()) {
      yield call(
        requestFlow,
        loginApi,
        {
          actionSuccess: loginSuccess,
          actionError: loginError,
          data: actionLogin.payload,
        },
      );
    } else { // signupSuccess
      yield put(loginSuccess(actionLogin.payload));
    }
    const token = yield select(getUserToken);
    yield call(setTokenToLocalStorage, token);
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
      console.log('authorize cancelled');
    }
  }
}

function* loginFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);
    let task;

    if (!isAuthorized) {
      if (localStorageToken) {
        const token = localStorageToken;
        yield call(
          requestFlow,
          authFromTokenApi,
          {
            actionSuccess: loginSuccess,
            actionError: loginError,
            data: { access_token: token },
          },
        );
      } else {
        const actionLogin = yield take([loginRequest, signupSuccess]);
        // fork return a Task object
        task = yield fork(authorize, actionLogin);
      }
    }
    const action = yield take([logoutRequest, loginError]);
    if (action.type === logoutRequest.toString()) {
      if (task) {
        yield cancel(task);
      }
      yield call(removeTokenFromLocalStorage);
      yield call(
        requestFlow,
        logoutApi,
        {
          actionSuccess: logoutSuccess,
          actionError: logoutError,
        },
      );
    }
  }
}

export default loginFlow;
