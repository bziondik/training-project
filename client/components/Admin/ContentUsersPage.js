import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Modal } from 'antd';
import PropTypes from 'prop-types';

import RegisterForm from '../Front/RegisterForm';

class ContentUsersPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
      visibleRegisterModal: false,
    };
  }
  componentDidMount() {
    this.props.usersRequest();
  }
  showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure delete this user?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: this.deleteUser,
      onCancel: this.clearSelectedUser,
    });
  };
  showEditRoleConfirm = (isAdmin) => {
    const title = isAdmin ?
      'Do you want to make this administrator a user?' :
      'Do you want to make this user an administrator?';
    Modal.confirm({
      title,
      okText: 'Yes',
      cancelText: 'No',
      onOk: this.updateUser,
      onCancel: this.clearSelectedUser,
    });
  };
  showDeleteInfo = () => {
    Modal.info({
      title: 'You can not delete yourself!',
    });
  }
  clearSelectedUser = () => {
    this.setState({ selectedUser: null });
  }
  handleUserEdit = (record) => {
    this.setState({ selectedUser: record });
    console.log(record);
    this.showEditRoleConfirm();
  }
  handleUserDelete = (record) => {
    console.log(record);
    const isMe = this.props.me && (record.id === this.props.me.id);
    if (!isMe) {
      this.setState({ selectedUser: record });
      this.showDeleteConfirm();
    } else {
      this.showDeleteInfo();
    }
  };
  deleteUser = () => {
    this.props.userDeleteRequest(this.state.selectedUser.id);
  }
  updateUser = () => {
    this.props.userUpdateRequest(
      this.state.selectedUser.id,
      { isAdmin: !this.state.selectedUser.isAdmin },
    );
  }
  handleClickCreateUser = () => {
    this.setState({ visibleRegisterModal: true });
  }
  handleCancelRegisterModal = () => {
    this.setState({ visibleRegisterModal: false });
  }
  handleSubmitRegisterForm = (data) => {
    console.log('handleSubmitRegisterForm data=', data);
    this.props.userCreateRequest(data);
    this.handleCancelRegisterModal();
  }
  render() {
    const {
      all,
    } = this.props.users;
    const columns = [{
      title: 'Name',
      dataIndex: 'username',
      render: (text, record) => <Link to={`/admin/users/${record.id}`}>{text}</Link>,
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
      render: (text, record) => {
        const handelClickEdit = () => {
          this.handleUserEdit(record);
        };
        const handelClickDelete = () => {
          this.handleUserDelete(record);
        };
        return (
          <React.Fragment>
            <Button shape="circle" onClick={handelClickEdit} icon="edit" />
            <Button shape="circle" onClick={handelClickDelete} icon="delete" />
          </React.Fragment>
        );
      },
    }];
    console.log('all users =', all);
    if (all.length) {
      return (
        <React.Fragment>
          <Button onClick={this.handleClickCreateUser}>Create User</Button>
          <Table rowKey="username" columns={columns} dataSource={all} />
          <Modal
            title="Register"
            visible={this.state.visibleRegisterModal}
            onCancel={this.handleCancelRegisterModal}
            footer={null}
            width={460}
          >
            <RegisterForm onSubmit={this.handleSubmitRegisterForm} />
          </Modal>
        </React.Fragment>
      );
    }
    return null;
  }
}

ContentUsersPage.propTypes = {
  users: PropTypes.shape({
    all: PropTypes.array,
  }).isRequired,
  me: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  usersRequest: PropTypes.func.isRequired,
  userDeleteRequest: PropTypes.func.isRequired,
  userUpdateRequest: PropTypes.func.isRequired,
  userCreateRequest: PropTypes.func.isRequired,
};

export default ContentUsersPage;
