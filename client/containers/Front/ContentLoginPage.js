import { connect } from 'react-redux';

import ContentLoginPageComponent from '../../components/Front/ContentLoginPage';

import { getIsAuthorized } from '../../reducers/auth';
import { loginRequest, logoutRequest } from '../../actions/auth';

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = {
  loginRequest,
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentLoginPageComponent);
