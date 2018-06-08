import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Input, Select } from 'antd';

import { SELECT } from '../../../utils/constants';

const { Option } = Select;

class SelectElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.settings.options[0].value,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (!state.isEditMode || (state.isEditMode && !props.isEditMode)) {
      return {
        isChangedPlaceholder: false,
        isChangedLabel: false,
        isChanged: props.settings.options.map(option => (
          { id: option.id, label: false, value: false }
        )),
        isEditMode: props.isEditMode,
      };
    }
    return {
      isEditMode: props.isEditMode,
    };
  }
  static getTypes() {
    return [SELECT];
  }
  onChangeSelectValue = (event) => {
    console.log('onChangeSelectValue ', event.target.value);
    this.setState({ value: event.target.value });
  }
  onChangeLabel = (event) => {
    console.log('onChangeLabel ', event.target.value);
    this.setState({ isChangedLabel: true });
    this.props.onChange({ label: event.target.value });
  }
  onChangePlaceholder = (event) => {
    console.log('onChangePlaceholder ', event.target.value);
    this.setState({ isChangedPlaceholder: true });
    this.props.onChange({ placeholder: event.target.value });
  }
  onChangeOptionLabel = (event) => {
    console.log('onChangeOptionLabel ', event.target.value);
    this.changeSettings(event.target, 'label');
  }
  onChangeOptionValue = (event) => {
    console.log('onChangeOptionValue ', event.target.value);
    this.changeSettings(event.target, 'value');
  }
  changeSettings = (target, key) => {
    const options = this.props.settings.options.slice();
    const isChanged = this.state.isChanged.slice();

    const id = parseInt(target.dataset.id, 10);
    const index = options.findIndex(radio => radio.id === id);

    options[index][key] = target.value;
    isChanged[index][key] = true;

    this.setState({ isChanged });
    this.props.onChange({ options });
  };
  addOptionItem = () => {
    const options = this.props.settings.options.slice();
    const isChanged = this.state.isChanged.slice();

    const nextId = options[options.length - 1].id + 1;
    options.push({
      label: `Option${nextId}`,
      value: `value${nextId}`,
      id: nextId,
    });
    isChanged.push({ id: nextId, label: false, value: false });

    this.setState({ isChanged });
    this.props.onChange({ options });
  }
  removeOptionItem = (event) => {
    console.log('removeRadioItem ', event.target.dataset.id);
    const deleteId = parseInt(event.target.dataset.id, 10);
    const options = this.props.settings.options.filter(radio => radio.id !== deleteId);
    const isChanged = this.state.isChanged.filter(radio => radio.id !== deleteId);
    this.setState({ isChanged });
    this.props.onChange({ options });
  }
  render() {
    const {
      isEditMode,
      settings: {
        label,
        placeholder,
        options,
        isSaved,
      },
    } = this.props;
    const isShowRemove = options.length > 2;
    const optionsIsEditRender = options.map((option, index) => (
      <Row key={option.id}>
        <Col span={12}>
          <Input
            addonBefore="Label:"
            placeholder={option.label}
            data-id={option.id}
            value={isSaved || this.state.isChanged[index].label ? option.label : ''}
            onChange={this.onChangeOptionLabel}
          />
        </Col>
        <Col span={10}>
          <Input
            addonBefore="Value:"
            placeholder={option.value}
            data-id={option.id}
            value={isSaved || this.state.isChanged[index].value ? option.value : ''}
            onChange={this.onChangeOptionValue}
          />
        </Col>
        {isShowRemove &&
        <Col span={2}>
          <Button shape="circle" icon="minus" data-id={option.id} onClick={this.removeOptionItem} />
        </Col>}
      </Row>
    ));
    const isEditRender = (
      <React.Fragment>
        <Input
          addonBefore="Label:"
          placeholder={label}
          value={isSaved || this.state.isChangedLabel ? label : ''}
          onChange={this.onChangeLabel}
        />
        <Input
          addonBefore="Placeholder:"
          placeholder={placeholder}
          value={isSaved || this.state.isChangedPlaceholder ? placeholder : ''}
          onChange={this.onChangePlaceholder}
        />
        {optionsIsEditRender}
        <Button shape="circle" icon="plus" onClick={this.addOptionItem} />
      </React.Fragment>
    );
    const optionsNoEditRender = options.map(option => (
      <Option value={option.value} key={option.id}>{option.label}</Option>
    ));
    const noEditRender = (
      <Row>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          { label }
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Select
            style={{ width: 200 }}
            placeholder={placeholder}
            default={this.state.value}
            onChange={this.onChangeSelectValue}
          >
            {optionsNoEditRender}
          </Select>
        </Col>
      </Row>
    );
    return isEditMode ? isEditRender : noEditRender;
  }
}

SelectElement.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })),
    isSaved: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func, // eslint-disable-line
};

export default SelectElement;
