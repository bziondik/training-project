import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer, Sider } = Layout; // eslint-disable-line


const Page = (menu, header, router) => (
  <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
    >
      <div className="logo" />
      {menu}
    </Sider>
    <Layout>
      <Header style={{ background: 'none', padding: 0 }}>
        {header}
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {router}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
);

export default Page;
