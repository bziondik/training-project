import React from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';

export default class BasicModal extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    const {
      buttonName,
      component: Component,
      title,
      ...rest
    } = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>{buttonName}</Button>
        <Modal
          title={title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Component {...rest} />
        </Modal>
      </div>
    );
  }
}

BasicModal.propTypes = {
  buttonName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
