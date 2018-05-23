import { connect } from 'react-redux';

import AuthBlockComponent from '../../components/Common/AuthBlock';

import { getIsAuthorized } from '../../reducers/auth';
import { signupRequest } from '../../actions/signup';
import { loginRequest, logoutRequest } from '../../actions/auth';

const mapStateToProps = state => ({
  signup: state.signup,
  auth: state.auth,
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = {
  signupRequest,
  loginRequest,
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthBlockComponent);
