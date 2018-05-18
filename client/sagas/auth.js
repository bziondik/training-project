import { take, select } from 'redux-saga/effects';

import { login, logout } from '../actions/auth';
import { getIsAuthorized } from '../reducers/auth';

export default function* lofinFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    if (!isAuthorized) {
      yield take(login);
    }
    yield take(logout);
  }
}
