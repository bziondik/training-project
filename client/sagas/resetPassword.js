import { call, takeLatest } from 'redux-saga/effects';

import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordError,
} from '../actions/resetPassword';
import requestFlow from './request';
import { forgotPasswordApi, resetPasswordApi } from './api';

function* forgotPasswordFlow(action) {
  yield call(
    requestFlow,
    forgotPasswordApi,
    {
      actionSuccess: forgotPasswordSuccess,
      actionError: forgotPasswordError,
      data: action.payload,
    },
  );
}
function* resetPasswordFlow(action) {
  yield call(
    requestFlow,
    resetPasswordApi,
    {
      actionSuccess: resetPasswordSuccess,
      actionError: resetPasswordError,
      data: action.payload,
    },
  );
}


function* resetPasswordWatcher() {
  yield takeLatest(forgotPasswordRequest, forgotPasswordFlow);
  yield takeLatest(resetPasswordRequest, resetPasswordFlow);
}

export default resetPasswordWatcher;
