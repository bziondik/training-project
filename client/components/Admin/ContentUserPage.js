import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

class ContentUserPage extends React.PureComponent {
  componentDidMount() {
    this.props.userGetRequest(this.props.match.params.user);
  }

  render() {
    const { current } = this.props.users;
    if (!current) {
      return null;
    }
    return (
      <React.Fragment>
        <Row>
          <Col span={4}>User Name</Col>
          <Col span={8}>{current.username}</Col>
        </Row>
        <Row>
          <Col span={4}>Email</Col>
          <Col span={8}>{current.email}</Col>
        </Row>
        <Row>
          <Col span={4}>Role</Col>
          <Col span={8}>{current.isAdmin ? 'Administrator' : 'User'}</Col>
        </Row>
        <Row>
          <Col span={4}>Created At</Col>
          <Col span={8}>{current.createdAt}</Col>
        </Row>
      </React.Fragment>
    );
  }
}

ContentUserPage.propTypes = {
  users: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  userGetRequest: PropTypes.func.isRequired,
};

export default ContentUserPage;
