import { connect } from 'react-redux';

import ContentRegisterPageComponent from '../../components/Front/ContentRegisterPage';

import { getIsAuthorized } from '../../reducers/auth';
import { logout } from '../../actions/auth';
import { signupRequest } from '../../actions/signup';

const mapStateToProps = state => ({
  signup: state.signup,
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = {
  signupRequest,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentRegisterPageComponent);
