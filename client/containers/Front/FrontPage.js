import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';

import Page from '../../components/Common/Page';
import AuthBlock from '../Common/AuthBlock';
import FrontRouter from '../../routers/FrontRouter';

const { Header, Content, Footer, Sider } = Layout; // eslint-disable-line

const frontMenu = (
  <Menu
    theme="dark"
    mode="inline"
  >
    <Menu.Item key="1"><NavLink to="/about">About</NavLink></Menu.Item>
    <Menu.Item key="2"><NavLink to="/examples">Examples</NavLink></Menu.Item>
  </Menu>
);

const frontHeader = (
  <AuthBlock />
);

const frontRouter = (
  <FrontRouter />
);

class FrontPage extends React.PureComponent {
  render() {
    const { location } = this.props;
    const showAuthBlock = !(location.pathname === '/login' || location.pathname === '/register');
    return Page(frontMenu, showAuthBlock ? frontHeader : '', frontRouter);
  }
}

FrontPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default FrontPage;
