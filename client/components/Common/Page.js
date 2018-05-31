import React from 'react';
import { Layout, Spin } from 'antd';
import PropTypes from 'prop-types';

const { Header, Content, Footer, Sider } = Layout; // eslint-disable-line

const Page = (props) => {
  const {
    isLoading,
    menu,
    header,
    router,
  } = props;
  const loading = (
    <div className="content__spin-wrapper">
      <Spin tip="Loading..." size="large" />
    </div>
  );
  return (
    <Layout>
      {isLoading && loading}
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
          <div className="content__wrapper">
            {router}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

Page.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  menu: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  router: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

export default Page;
