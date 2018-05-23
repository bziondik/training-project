import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import Page from '../../components/Common/Page';
import AuthBlock from '../Common/AuthBlock';
import AdminRouter from '../../routers/AdminRouter';

const { Header, Content, Footer, Sider } = Layout; // eslint-disable-line

const adminMenu = (
  <Menu
    theme="dark"
    mode="inline"
  >
    <Menu.Item key="1"><NavLink to="/admin/create">New Calculator</NavLink></Menu.Item>
    <Menu.Item key="2"><NavLink to="/admin/list">My Calculators</NavLink></Menu.Item>
    <Menu.Item key="3"><NavLink to="/admin/templates">Templates</NavLink></Menu.Item>
    <Menu.Item key="4"><NavLink to="/admin/users">Users</NavLink></Menu.Item>
  </Menu>
);

const adminHeader = (
  <AuthBlock />
);

const adminRouter = (
  <AdminRouter />
);

const FrontPage = () => Page(adminMenu, adminHeader, adminRouter);

export default FrontPage;
