import React from 'react';
import { Card, Icon, Modal, Input, Tooltip } from 'antd';
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
    onChangeVariable = (event) => {
      this.setState({ settings: { ...this.state.settings, variable: event.target.value } });
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
    handleChange = (newSettings) => {
      console.log('handleChange ', newSettings);
      this.setState({
        settings: {
          ...this.state.settings,
          ...newSettings,
        },
      });
    }
    render() {
      const { isEdit, settings } = this.state;
      const isEditRender = (
        <Card
          style={{ width: 450 }}
          extra={
            <div className="edit-element-box__header">
              <Icon type="arrows-alt" style={{ transform: 'rotate(-45deg)' }} />
              <Icon type="close" onClick={this.closeEditMode} />
            </div>}
          actions={[
            // <Icon type="setting" />,
            <Input
              placeholder="Variable Name"
              value={settings.variable}
              onChange={this.onChangeVariable}
            />,
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
            <Tooltip title="Use this name in the result formula">
              {settings.variable}
            </Tooltip>,
            <Icon type="delete" onClick={this.handleOnDelete} />,
            '',
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
