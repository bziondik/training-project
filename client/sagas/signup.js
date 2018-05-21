import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { signupRequest, signupSuccess, signupError } from '../actions/signup';
import requestFlow from './request';

// TODO !!!The url derived from our .env file
const signupUrl = 'http://localhost:3000/api/saveNewUser';

function signupApi(data) {
  return axios.post(signupUrl, data);
}

function* signupFlow(action) {
  try {
    const response = yield call(requestFlow, signupApi, action.payload);

    yield put(signupSuccess(response));
  } catch (error) {
    yield put(signupError(error));
  }
}


function* signupWatcher() {
  yield takeLatest(signupRequest, signupFlow);
}

export default signupWatcher;
