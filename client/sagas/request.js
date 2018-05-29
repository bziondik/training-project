import { call, put, select } from 'redux-saga/effects';

import { clearNetworkErrors, networkError } from '../actions/network';
import { logout } from '../actions/auth';
import { getIsNetworkErrorPresent } from '../reducers/network';

export default function* (fn, settings) {
  try {
    if (yield select(getIsNetworkErrorPresent)) {
      yield put(clearNetworkErrors());
    }
    let response;
    if (settings && settings.data) {
      response = yield call(fn, settings.data);
    } else {
      response = yield call(fn);
    }
    if (settings && settings.actionSuccess) {
      yield put(settings.actionSuccess(response.data));
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      yield put(logout());
    } else {
      yield put(networkError(error));
    }
    const message = error.response && error.response.data && error.response.data.message;
    if (settings && settings.actionError) {
      yield put(settings.actionError(message));
    }
  }
}
