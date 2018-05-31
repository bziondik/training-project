import { connect } from 'react-redux';

import ContentLoginPageComponent from '../../components/Front/ContentLoginPage';

import { getIsAuthorized } from '../../reducers/auth';
import { loginRequest, logout } from '../../actions/auth';

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = {
  loginRequest,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentLoginPageComponent);
