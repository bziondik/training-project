import { take, select } from 'redux-saga/effects';

import { authorize, logout } from '../actions/auth';
import { getIsAuthorized } from '../reducers/auth';

export default function* authFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    if (!isAuthorized) {
      yield take(authorize);
    }
    yield take(logout);
  }
}
