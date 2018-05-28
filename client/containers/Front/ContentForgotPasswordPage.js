import { connect } from 'react-redux';

import ContentForgotPasswordPageComponent from '../../components/Front/ContentForgotPasswordPage';

import { getIsAuthorized } from '../../reducers/auth';
import { forgotPasswordRequest } from '../../actions/resetPassword';

const mapStateToProps = state => ({
  resetPassword: state.resetPassword,
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = {
  forgotPasswordRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentForgotPasswordPageComponent);
