import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Page from '../Common/Page';
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
// component prevents updates
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
// solution <UpdateBlocker location={location}>
class FrontPage extends React.PureComponent {
  render() {
    const { location } = this.props;
    const authURLs = ['/login', '/register', '/resetpassword', '/forgotpassword'];
    const showAuthBlock = authURLs.indexOf(location.pathname) === -1;
    return <Page menu={frontMenu} header={showAuthBlock ? frontHeader : ''} router={frontRouter} location={location} />;
  }
}

FrontPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(connect()(FrontPage));
