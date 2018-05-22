import { call, put, select } from 'redux-saga/effects';

import { clearNetworkErrors, networkError } from '../actions/network';
import { logout } from '../actions/auth';
import { getIsNetworkErrorPresent } from '../reducers/network';

export default function* (fn, args) {
  try {
    console.log('request fn =', fn);
    const response = yield call(fn, args);
    console.log('request call(fn, args) response=', response);
    if (yield select(getIsNetworkErrorPresent)) yield put(clearNetworkErrors());

    return response;
  } catch (error) {
    yield put(networkError(error));

    if (error.response.status === 401) yield put(logout());

    throw error;
  }
}
