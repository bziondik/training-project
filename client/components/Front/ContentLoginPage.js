import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';

class ContentLoginPage extends React.PureComponent {
  handleSubmitLoginForm = (data) => {
    console.log('handleSubmitLoginForm data=', data);
    this.props.loginRequest(data);
  }
  handleSubmitLogout = () => {
    this.props.logout();
  }

  render() {
    const { isAuthorized } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/admin' } };
    const renderNotAuthorized = () => (
      <LoginForm onSubmit={this.handleSubmitLoginForm} />
    );
    const renderIsAuthorized = () => (
      <Redirect to={from} />
    );
    return (
      <div className="content__form">
        {isAuthorized ? renderIsAuthorized() : renderNotAuthorized()}
      </div>
    );
  }
}

ContentLoginPage.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  loginRequest: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
};

export default withRouter(ContentLoginPage);
