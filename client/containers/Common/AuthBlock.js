import { connect } from 'react-redux';

import AuthBlockComponent from '../../components/Common/AuthBlock';

import { getIsAuthorized } from '../../reducers/auth';
import { signupRequest } from '../../actions/signup';
import { loginRequest, logout } from '../../actions/auth';

const mapStateToProps = state => ({
  signup: state.signup,
  auth: state.auth,
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = {
  signupRequest,
  loginRequest,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthBlockComponent);
