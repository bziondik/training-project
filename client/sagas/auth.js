import axios from 'axios';
import { call, take, cancel, fork, cancelled, put } from 'redux-saga/effects';

import {
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
} from '../actions/auth';
import requestFlow from './request';
import { loginUrl, logoutUrl } from './api';
import { signupSuccess } from '../actions/signup';
// function testApi(data) {
//   console.log('testApi data=', data);
//   return axios.get('http://localhost:3000/api/test');
//   // return fetch('/api/test');
// }

function loginApi(data) {
  console.log('loginApi data=', data);
  return axios.post(loginUrl, data);
}
function logoutApi() {
  console.log('logoutApi');
  return axios.post(logoutUrl);
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
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
      console.log('authorize cancelled');
    }
  }
}

function* loginFlow() {
  while (true) {
    const actionLogin = yield take([loginRequest, signupSuccess]);
    // fork return a Task object
    const task = yield fork(authorize, actionLogin);
    const action = yield take([logoutRequest, loginError]);
    if (action.type === logoutRequest.toString()) {
      yield cancel(task);
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
