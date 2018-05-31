import { takeEvery, select, put } from 'redux-saga/effects';
import { message } from 'antd';

import { networkError, clearNetworkErrors } from '../actions/network';
import { getNetworkError } from '../reducers/network';

function* errorFlow() {
  const errorText = yield select(getNetworkError);
  message.error(errorText);
  yield put(clearNetworkErrors());
}

function* signupWatcher() {
  yield takeEvery(networkError, errorFlow);
}

export default signupWatcher;
