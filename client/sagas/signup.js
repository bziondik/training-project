import axios from 'axios';
import { call, takeLatest } from 'redux-saga/effects';

import { signupRequest, signupSuccess, signupError } from '../actions/signup';
import requestFlow from './request';
import { signupUrl } from './api';

function signupApi(data) {
  return axios.post(signupUrl, data);
}

function* signupFlow(action) {
  yield call(
    requestFlow,
    signupApi,
    {
      actionSuccess: signupSuccess,
      actionError: signupError,
      data: action.payload,
    },
  );
}


function* signupWatcher() {
  yield takeLatest(signupRequest, signupFlow);
}

export default signupWatcher;
