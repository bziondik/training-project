import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Button, Menu, Modal } from 'antd';
import PropTypes from 'prop-types';

import FrontRouter from '../../routers/FrontRouter';
import LoginForm from '../../components/Front/LoginForm';
import RegisterForm from '../../components/Front/RegisterForm';
import { signupRequest } from '../../actions/signup';
import { loginRequest } from '../../actions/auth';


const { Header, Content, Footer, Sider } = Layout; // eslint-disable-line
const ButtonGroup = Button.Group;

class FrontPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      visibleLoginModal: false,
      visibleRegisterModal: false,
    };
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
  }
  handleSubmitLoginForm = (data) => {
    console.log('handleSubmitLoginForm data=', data);
    this.props.loginRequest(data);
  }

  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
          >
            <Menu.Item key="1"><NavLink to="/about">About</NavLink></Menu.Item>
            <Menu.Item key="2"><NavLink to="/examples">Examples</NavLink></Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: 'none', padding: 0 }}>
            <ButtonGroup style={{ float: 'right' }}>
              <Button onClick={this.showLoginModal}>Login</Button>
              <Button onClick={this.showRegisterModal}>Register</Button>
            </ButtonGroup>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <FrontRouter />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant sUED
          </Footer>
        </Layout>
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
      </Layout>
    );
  }
}

FrontPage.propTypes = {
  signupRequest: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  signup: state.signup,
});

const mapDispatchToProps = {
  signupRequest,
  loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
