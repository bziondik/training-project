
import { combineReducers } from 'redux';

import auth from './auth';
import signup from './signup';
import resetPassword from './resetPassword';
import network from './network';
import users from './users';

export default combineReducers({
  auth,
  signup,
  resetPassword,
  network,
  users,
});
