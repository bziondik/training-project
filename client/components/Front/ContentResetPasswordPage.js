import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { message } from 'antd';
import PropTypes from 'prop-types';

import ResetPasswordForm from './ResetPasswordForm';

class ContentResetPasswordPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      hideMessageRequest: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetPassword.isFetching && !this.props.resetPassword.isFetching) {
      if (this.state.hideMessageRequest) {
        this.state.hideMessageRequest();
      }
    }
  }

  handleSubmitResetPasswordForm = (data) => {
    console.log('handleSubmitResetPasswordForm data=', data);
    this.props.resetPasswordRequest(data);
    const hide = message.loading('Please, wait..', 0);
    this.setState({ hideMessageRequest: hide });
  }

  render() {
    const {
      isAuthorized,
      resetPassword: { isSuccess },
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
        {isSuccess ? renderSend() : renderNotSend()}
      </React.Fragment>
    );
    const renderIsAuthorized = () => (
      <Redirect to="/admin" />
    );
    return isAuthorized ? renderIsAuthorized() : renderNotAuthorized();
  }
}

ContentResetPasswordPage.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  resetPassword: PropTypes.shape({
    isFetching: PropTypes.bool,
  }).isRequired,
  resetPasswordRequest: PropTypes.func.isRequired,
};

export default ContentResetPasswordPage;
