import { connect } from 'react-redux';

import ContentResetPasswordPageComponent from '../../components/Front/ContentResetPasswordPage';

import { getIsAuthorized } from '../../reducers/auth';
import { resetPasswordRequest } from '../../actions/resetPassword';

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = {
  resetPasswordRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentResetPasswordPageComponent);
