import React from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import PropTypes from 'prop-types';

import RegisterForm from './RegisterForm';

class ContentRegisterPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      hideMessageRequest: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signup.isFetching && !this.props.signup.isFetching) {
      if (this.state.hideMessageRequest) {
        this.state.hideMessageRequest();
      }
    }
  }

  handleSubmitRegisterForm = (data) => {
    console.log('handleSubmitRegisterForm data=', data);
    this.props.signupRequest(data);
    const hide = message.loading('Registration in progress..', 0);
    this.setState({ hideMessageRequest: hide });
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
  signup: PropTypes.shape({
    isFetching: PropTypes.bool,
  }).isRequired,
  signupRequest: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default ContentRegisterPage;
