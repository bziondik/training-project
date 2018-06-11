
import { combineReducers } from 'redux';

import auth from './auth';
import signup from './signup';
import resetPassword from './resetPassword';
import network from './network';
import users from './users';
import calculators from './calculators';

export default combineReducers({
  auth,
  signup,
  resetPassword,
  network,
  users,
  calculators,
});
