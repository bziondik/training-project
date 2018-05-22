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
  return fetch(
    loginUrl,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
}

// function loginApi(data) {
//   console.log('loginApi data=', data);
//   return axios.post(loginUrl, data);
// }
function logoutApi(data) {
  console.log('logoutApi data=', data);
  return axios.post(logoutUrl, data);
}

function* authorize(data) {
  try {
    console.log('try authorize data=', data);
    // const user = yield call(testApi, data);
    const response = yield call(loginApi, data);
    const user = response.json();
    console.log('authorize call(loginApi, data) user=', user);
    // const user = yield call(requestFlow, loginApi, data);
    // console.log('authorize call(requestFlow, loginApi, data) user=', user);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginError(error));
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
    console.log('loginFlow actionLogin=', actionLogin);
    // fork return a Task object
    const task = yield fork(authorize, actionLogin.payload);
    console.log('loginFlow fork authorize task=', task);
    const action = yield take([logoutRequest, loginError]);
    console.log('loginFlow take logoutRequest action=', action);
    if (action.type === logoutRequest) {
      yield cancel(task);
      try {
        const response = yield call(requestFlow, logoutApi);
        yield put(logoutSuccess(response));
      } catch (error) {
        yield put(logoutError(error));
      }
    }
  }
}

export default loginFlow;
