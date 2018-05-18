
import { fork } from 'redux-saga/effects';

import authFlow from './auth';
import signupWatcher from './signup';

export default function* () {
  yield fork(authFlow);
  yield fork(signupWatcher);
}
