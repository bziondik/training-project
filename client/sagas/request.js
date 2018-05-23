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
    return response.data;
  } catch (error) {
    if (settings && settings.actionError) {
      if (error && error.data && error.data.message) {
        yield put(settings.actionError(error.data.message));
        return error;
      }
    }
    yield put(networkError(error));

    if (error.response.status === 401) yield put(logout());

    return error;
  }
}
