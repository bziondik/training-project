import { call, put, select } from 'redux-saga/effects';

import { clearNetworkErrors, networkError } from '../actions/network';
import { logoutRequest } from '../actions/auth';
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
    if (error.response && error.response.data && error.response.data.message) {
      if (settings && settings.actionError) {
        yield put(settings.actionError(error.response.data.message));
      }
      yield put(networkError(error));
    }

    if (error.response.status === 401) yield put(logoutRequest());

    return error;
  }
}
