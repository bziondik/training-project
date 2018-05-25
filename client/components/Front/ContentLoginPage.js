import React from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import PropTypes from 'prop-types';

import LoginForm from '../../components/Front/LoginForm';

class ContentLoginPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      hideMessageRequest: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.isLoginFetching && !this.props.auth.isLoginFetching) {
      if (this.state.hideMessageRequest) {
        this.state.hideMessageRequest();
      }
    }
  }

  handleSubmitLoginForm = (data) => {
    console.log('handleSubmitLoginForm data=', data);
    this.props.loginRequest(data);
    const hide = message.loading('Login in progress..', 0);
    this.setState({ hideMessageRequest: hide });
  }
  handleSubmitLogout = () => {
    this.props.logout();
  }

  render() {
    const { isAuthorized } = this.props;
    const renderNotAuthorized = () => (
      <LoginForm onSubmit={this.handleSubmitLoginForm} />
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

ContentLoginPage.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  auth: PropTypes.shape({
    user: PropTypes.object,
    isLoginFetching: PropTypes.bool,
  }).isRequired,
  loginRequest: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default ContentLoginPage;
