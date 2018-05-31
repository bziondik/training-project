import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Modal, Menu, Dropdown, Icon } from 'antd';
import PropTypes from 'prop-types';

import LoginForm from '../../components/Front/LoginForm';
import RegisterForm from '../../components/Front/RegisterForm';

const ButtonGroup = Button.Group;

class AuthBlock extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      visibleLoginModal: false,
      visibleRegisterModal: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAuthorized &&
      (prevState.visibleLoginModal || prevState.visibleRegisterModal)) {
      return {
        ...prevState,
        visibleLoginModal: false,
        visibleRegisterModal: false,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.auth.isLoginFetching && !this.props.auth.isLoginFetching) ||
      (prevProps.signup.isFetching && !this.props.signup.isFetching)) {
      if (this.props.auth.error) {
        this.showLoginModal();
      }
      if (this.props.signup.error) {
        this.showRegisterModal();
      }
    }
  }

  showLoginModal = () => {
    this.setState({ visibleLoginModal: true });
  }
  handleCancelLoginModal = () => {
    this.setState({ visibleLoginModal: false });
  }
  showRegisterModal = () => {
    this.setState({ visibleRegisterModal: true });
  }
  handleCancelRegisterModal = () => {
    this.setState({ visibleRegisterModal: false });
  }
  handleSubmitRegisterForm = (data) => {
    console.log('handleSubmitRegisterForm data=', data);
    this.props.signupRequest(data);
    this.handleCancelRegisterModal();
  }
  handleSubmitLoginForm = (data) => {
    console.log('handleSubmitLoginForm data=', data);
    this.props.loginRequest(data);
    this.handleCancelLoginModal();
  }
  handleSubmitLogout = () => {
    this.props.logout();
  }
  handleUserMenuClick = (e) => {
    console.log('click', e);
  }

  render() {
    const {
      isAuthorized,
      auth: { user },
    } = this.props;
    const renderNotAuthorized = () => (
      <React.Fragment>
        <ButtonGroup style={{ float: 'right' }}>
          <Button onClick={this.showLoginModal}>Login</Button>
          <Button onClick={this.showRegisterModal}>Register</Button>
        </ButtonGroup>
        <Modal
          title="Login"
          visible={this.state.visibleLoginModal}
          onCancel={this.handleCancelLoginModal}
          footer={null}
          width={360}
        >
          <LoginForm onSubmit={this.handleSubmitLoginForm} />
        </Modal>
        <Modal
          title="Register"
          visible={this.state.visibleRegisterModal}
          onCancel={this.handleCancelRegisterModal}
          footer={null}
          width={460}
        >
          <RegisterForm onSubmit={this.handleSubmitRegisterForm} />
        </Modal>
      </React.Fragment>
    );
    const menu = () => {
      const urlSettings = `/admin/user/${user._id}`; // eslint-disable-line
      return (
        <Menu onClick={this.handleUserMenuClick}>
          <Menu.Item key="1"><NavLink to="/admin"> AdminPage </NavLink></Menu.Item>
          <Menu.Item key="2"><NavLink to={urlSettings}> Settings </NavLink></Menu.Item>
        </Menu>
      );
    };
    const renderIsAuthorized = () => (
      <React.Fragment>
        <ButtonGroup style={{ float: 'right' }}>
          <Dropdown overlay={menu()}>
            <Button>
              {user.username} <Icon type="down" />
            </Button>
          </Dropdown>
          <Button onClick={this.handleSubmitLogout}>Logout</Button>
        </ButtonGroup>
      </React.Fragment>
    );
    return isAuthorized ? renderIsAuthorized() : renderNotAuthorized();
  }
}

AuthBlock.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  auth: PropTypes.shape({
    user: PropTypes.object,
    isLoginFetching: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  signup: PropTypes.shape({
    isFetching: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  signupRequest: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default AuthBlock;
