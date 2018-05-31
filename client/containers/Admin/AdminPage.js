import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';

import Page from '../Common/Page';
import AuthBlock from '../Common/AuthBlock';
import AdminRouter from '../../routers/AdminRouter';

const { Header, Content, Footer, Sider } = Layout; // eslint-disable-line

const adminMenu = isAdmin => (
  <Menu
    theme="dark"
    mode="inline"
  >
    <Menu.Item key="1"><NavLink to="/admin/create">New Calculator</NavLink></Menu.Item>
    <Menu.Item key="2"><NavLink to="/admin/list">My Calculators</NavLink></Menu.Item>
    <Menu.Item key="3"><NavLink to="/admin/templates">Templates</NavLink></Menu.Item>
    {isAdmin && <Menu.Item key="4"><NavLink to="/admin/users">Users</NavLink></Menu.Item> }
  </Menu>
);

const adminHeader = (
  <AuthBlock />
);

const adminRouter = (
  <AdminRouter />
);

class AdminPage extends React.PureComponent {
  render() {
    return (<Page
      menu={adminMenu(this.props.user && this.props.user.isAdmin)}
      header={adminHeader}
      router={adminRouter}
    />);
  }
}
AdminPage.defaultProps = {
  user: null,
};

AdminPage.propTypes = {
  user: PropTypes.shape({
    isAdmin: PropTypes.bool,
  }),
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(AdminPage);
