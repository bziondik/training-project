import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';

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

const FrontPage = () => Page(frontMenu, frontHeader, frontRouter);

export default FrontPage;
