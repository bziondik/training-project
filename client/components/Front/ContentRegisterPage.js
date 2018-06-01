import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import RegisterForm from './RegisterForm';

class ContentRegisterPage extends React.PureComponent {
  handleSubmitRegisterForm = (data) => {
    console.log('handleSubmitRegisterForm data=', data);
    this.props.signupRequest(data);
  }
  handleSubmitLogout = () => {
    this.props.logout();
  }

  render() {
    const { isAuthorized } = this.props;
    const renderNotAuthorized = () => (
      <RegisterForm onSubmit={this.handleSubmitRegisterForm} />
    );
    const renderIsAuthorized = () => (
      <Redirect to="/admin" />
    );
    return (
      <div className="content__form">
        {isAuthorized ? renderIsAuthorized() : renderNotAuthorized()}
      </div>
    );
  }
}

ContentRegisterPage.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  signupRequest: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default ContentRegisterPage;
