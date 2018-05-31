
import { fork } from 'redux-saga/effects';

import authFlow from './auth';
import signupWatcher from './signup';
import resetPasswordWatcher from './resetPassword';
import usersWatcher from './users';
import messageWatcher from './message';

export default function* () {
  yield fork(authFlow);
  yield fork(signupWatcher);
  yield fork(resetPasswordWatcher);
  yield fork(usersWatcher);
  yield fork(messageWatcher);
}
