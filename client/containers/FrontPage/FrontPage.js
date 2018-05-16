import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import FrontRouter from '../../routers/FrontRouter';

const { Header, Content, Footer } = Layout;

const menuMap = new Map();
menuMap.set('/', { key: '1', name: 'Main' });
menuMap.set('/about', { key: '2', name: 'About' });
menuMap.set('/examples', { key: '3', name: 'Examples' });
menuMap.set('/login', { key: '4', name: 'Login' });
menuMap.set('/admin', { key: '5', name: 'Admin' });

class FrontPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      smth: 'Hello',
    };
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><NavLink to="/">Main</NavLink></Menu.Item>
            <Menu.Item key="2"><NavLink to="/about">About</NavLink></Menu.Item>
            <Menu.Item key="3"><NavLink to="/examples">Examples</NavLink></Menu.Item>
            <Menu.Item key="4"><NavLink to="/login">Login</NavLink></Menu.Item>
            <Menu.Item key="5"><NavLink to="/admin">Admin</NavLink></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <FrontRouter />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED {this.state.smth}
        </Footer>
      </Layout>
    );
  }
}

export default FrontPage;
