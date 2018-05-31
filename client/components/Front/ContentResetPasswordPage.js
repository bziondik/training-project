import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import ResetPasswordForm from './ResetPasswordForm';

class ContentResetPasswordPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isSend: false,
    };
  }

  handleSubmitResetPasswordForm = (data) => {
    console.log('handleSubmitResetPasswordForm data=', data);
    const searchParams = new URLSearchParams(this.props.location.search);
    this.props.resetPasswordRequest({ ...data, resetToken: searchParams.get('token') });
    this.setState({ isSend: true });
  }

  render() {
    const {
      isAuthorized,
    } = this.props;
    const renderNotSend = () => (
      <React.Fragment>
        <p className="content__description">Enter a new password.</p>
        <div className="content__form">
          <ResetPasswordForm onSubmit={this.handleSubmitResetPasswordForm} />
        </div>
      </React.Fragment>
    );
    const renderSend = () => (
      <React.Fragment>
        <p className="content__description">Your password has been reseted. Now, you can <Link to="/login">Log in</Link></p>
      </React.Fragment>
    );
    const renderNotAuthorized = () => (
      <React.Fragment>
        <h1 className="content__title">Reset your password</h1>
        {this.state.isSend ? renderSend() : renderNotSend()}
      </React.Fragment>
    );
    const renderIsAuthorized = () => (
      <Redirect to="/admin" />
    );
    return isAuthorized ? renderIsAuthorized() : renderNotAuthorized();
  }
}

ContentResetPasswordPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  resetPasswordRequest: PropTypes.func.isRequired,
};

export default withRouter(ContentResetPasswordPage);
