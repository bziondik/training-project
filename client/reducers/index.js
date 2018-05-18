
import { combineReducers } from 'redux';

import auth from './auth';
import signup from './signup';
import network from './network';

export default combineReducers({
  auth,
  signup,
  network,
});
