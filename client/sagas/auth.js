import axios from 'axios';
import { call, put, take, cancel, fork, cancelled } from 'redux-saga/effects';

import {
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
} from '../actions/auth';
import requestFlow from './request';

// TODO !!!The url derived from our .env file
const loginUrl = '/api/login';
const logoutUrl = '/api/logout';

// function testApi(data) {
//   console.log('testApi data=', data);
//   return axios.get('http://localhost:3000/api/test');
//   // return fetch('/api/test');
// }

function loginApi(data) {
  console.log('loginApi data=', data);
  return axios.post(loginUrl, data);
}
function logoutApi(data) {
  console.log('logoutApi data=', data);
  return axios.post(logoutUrl, data);
}

function* authorize(data) {
  try {
    yield call(
      requestFlow,
      loginApi,
      {
        actionSuccess: loginSuccess,
        actionError: loginError,
        data,
      },
    );
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
      console.log('authorize cancelled');
    }
  }
}

function* loginFlow() {
  while (true) {
    const actionLogin = yield take(loginRequest);
    // fork return a Task object
    const task = yield fork(authorize, actionLogin.payload);
    const action = yield take([logoutRequest, loginError]);
    if (action.type === logoutRequest) {
      yield cancel(task);
      yield call(
        requestFlow,
        logoutApi,
        {
          actionSuccess: logoutSuccess,
          actionError: logoutError,
        },
      );
      try {
        const response = yield call(requestFlow, logoutApi, logoutError);
        yield put(logoutSuccess(response));
      } catch (error) {
        yield put(logoutError(error));
      }
    }
  }
}

export default loginFlow;
