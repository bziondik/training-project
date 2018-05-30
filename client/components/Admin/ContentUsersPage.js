import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, message } from 'antd';
import PropTypes from 'prop-types';

const columns = [{
  title: 'Name',
  dataIndex: 'username',
  render: text => <Link to={`/users/${text}`}>{text}</Link>,
}, {
  title: 'Email',
  dataIndex: 'email',
  render: text => <a href={`mailto:${text}`}>{text}</a>,
}, {
  title: 'Role',
  dataIndex: 'isAdmin',
  render: isAdmin => (isAdmin ? 'Administrator' : 'User'),
}, {
  title: 'Registered At',
  dataIndex: 'createdAt',
  render: timestamp => (new Date(timestamp)).toLocaleDateString(),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <React.Fragment>
      <Button shape="circle" icon="edit" />
      <Button shape="circle" icon="delete" />
    </React.Fragment>
  ),
}];

class ContentUserPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      hideMessageRequest: null,
    };
  }

  componentDidMount() {
    this.props.usersRequest();
    const hide = message.loading('Please, wait..', 0);
    this.setState({ hideMessageRequest: hide });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users.isFetching && !this.props.users.isFetching) {
      if (this.state.hideMessageRequest) {
        this.state.hideMessageRequest();
      }
    }
  }

  render() {
    const {
      all,
    } = this.props.users;
    console.log('all users =', all);
    if (all.length) {
      return <Table rowKey="username" columns={columns} dataSource={all} />;
    }
    return null;
  }
}

ContentUserPage.propTypes = {
  users: PropTypes.shape({
    all: PropTypes.array,
    isFetching: PropTypes.bool,
  }).isRequired,
  usersRequest: PropTypes.func.isRequired,
};

export default ContentUserPage;
