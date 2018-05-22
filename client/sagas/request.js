import { call, put, select } from 'redux-saga/effects';

import { clearNetworkErrors, networkError } from '../actions/network';
import { logout } from '../actions/auth';
import { getIsNetworkErrorPresent, getNetworkError } from '../reducers/network';

export default function* (fn, settings) {
  try {
    const response = yield call(fn, settings.data);
    if (yield select(getIsNetworkErrorPresent)) yield put(clearNetworkErrors());

    yield put(settings.actionSuccess(response));
    return true;
  } catch (error) {
    yield put(networkError(error));
    const message = yield select(getNetworkError);
    yield put(clearNetworkErrors());
    yield put(settings.actionError(message));

    if (error.response.status === 401) yield put(logout());

    return false;
  }
}
