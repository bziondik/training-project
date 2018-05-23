import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';

import AuthBlock from './AuthBlock';
import FrontRouter from '../../routers/FrontRouter';

const { Header, Content, Footer, Sider } = Layout; // eslint-disable-line


class FrontPage extends PureComponent {
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
            <AuthBlock />
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
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  signup: state.signup,
});

export default connect(mapStateToProps)(FrontPage);
