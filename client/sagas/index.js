
import { fork } from 'redux-saga/effects';

import authFlow from './auth';
import signupWatcher from './signup';
import resetPasswordWatcher from './resetPassword';

export default function* () {
  yield fork(authFlow);
  yield fork(signupWatcher);
  yield fork(resetPasswordWatcher);
}
