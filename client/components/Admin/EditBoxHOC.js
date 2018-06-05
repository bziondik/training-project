import React from 'react';
import { Card, Icon, Modal } from 'antd';
import PropTypes from 'prop-types';

function editBoxHOC(ElementComponent, onSave, onDelete) {
  class EditBoxHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isEdit: false,
        settings: { ...props.settings },
      };
    }
    showEditMode = () => {
      this.setState({ isEdit: true, settings: { ...this.props.settings } });
    }
    closeEditMode = () => {
      this.setState({ isEdit: false });
    }
    handleOnSave = () => {
      onSave(this.props.index, this.state.settings);
      this.closeEditMode();
    }
    handleOnDelete = () => {
      this.showDeleteConfirm();
    }
    showDeleteConfirm = () => {
      Modal.confirm({
        title: 'Are you sure delete this element?',
        okText: 'Yes',
        cancelText: 'No',
        onOk: onDelete.bind(this, this.props.index),
      });
    };
    handleChange = (event) => {
      console.log(event.target.value);
      this.setState({
        settings: {
          ...this.state.settings,
          isChanged: true,
          [event.target.name]: event.target.value,
        },
      });
    }
    render() {
      const { isEdit } = this.state;
      const isEditRender = (
        <Card
          style={{ width: 450 }}
          extra={
            <div className="edit-element-box__header">
              <Icon type="arrows-alt" style={{ transform: 'rotate(-45deg)' }} />
              <Icon type="close" onClick={this.closeEditMode} />
            </div>}
          actions={[
            <Icon type="setting" />,
            <Icon type="delete" onClick={this.handleOnDelete} />,
            <Icon type="save" onClick={this.handleOnSave} />,
          ]}
        >
          <ElementComponent
            isEditMode
            onChange={this.handleChange}
            settings={this.state.settings}
          />
        </Card>
      );
      const noEditRender = (
        <Card
          style={{ width: 450 }}
          extra={
            <div className="edit-element-box__header">
              <Icon type="arrows-alt" style={{ transform: 'rotate(-45deg)' }} />
              <Icon type="edit" onClick={this.showEditMode} />
            </div>}
          actions={[
            <Icon type="delete" onClick={this.handleOnDelete} />,
          ]}
        >
          <ElementComponent isEditMode={false} settings={this.props.settings} />
        </Card>
      );
      return isEdit ? isEditRender : noEditRender;
    }
  }

  EditBoxHOC.propTypes = {
    index: PropTypes.number.isRequired,
    settings: PropTypes.object.isRequired, // eslint-disable-line
  };

  return EditBoxHOC;
}

export default editBoxHOC;
