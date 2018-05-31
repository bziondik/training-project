import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import ForgotPasswordForm from './ForgotPasswordForm';

class ContentForgotPasswordPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isSend: false,
    };
  }

  handleSubmitForgotPasswordForm = (data) => {
    console.log('handleSubmitResetPasswordForm data=', data);
    this.props.forgotPasswordRequest(data);
    this.setState({ isSend: true });
  }

  render() {
    const {
      isAuthorized,
    } = this.props;
    const renderNotSend = () => (
      <React.Fragment>
        <p className="content__description">Enter your email address and we will send you a link to reset your password.</p>
        <div className="content__form">
          <ForgotPasswordForm onSubmit={this.handleSubmitForgotPasswordForm} />
        </div>
      </React.Fragment>
    );
    const renderSend = () => (
      <React.Fragment>
        <p className="content__description">Сheck your email and follow the instructions.</p>
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

ContentForgotPasswordPage.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  forgotPasswordRequest: PropTypes.func.isRequired,
};

export default ContentForgotPasswordPage;
