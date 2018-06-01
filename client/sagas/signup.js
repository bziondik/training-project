import { call, takeLatest } from 'redux-saga/effects';

import { signupRequest, signupSuccess, signupError } from '../actions/signup';
import requestFlow from './request';
import { signupApi } from './api';

function* signupFlow(action) {
  yield call(
    requestFlow,
    signupApi,
    {
      actionSuccess: signupSuccess,
      actionError: signupError,
      data: action.payload,
      isLoading: true,
    },
  );
}


function* signupWatcher() {
  yield takeLatest(signupRequest, signupFlow);
}

export default signupWatcher;
