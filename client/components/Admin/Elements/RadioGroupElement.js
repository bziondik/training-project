import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Input, Radio } from 'antd';

import { RADIO_GROUP } from '../../../utils/constants';

const RadioGroup = Radio.Group;

class RadioGroupElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.settings.radios[0].value,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (!state.isEditMode || (state.isEditMode && !props.isEditMode)) {
      return {
        isChangedLabel: false,
        isChanged: props.settings.radios.map(radio => (
          { id: radio.id, label: false, value: false }
        )),
        isEditMode: props.isEditMode,
      };
    }
    return {
      isEditMode: props.isEditMode,
    };
  }
  static getTypes() {
    return [RADIO_GROUP];
  }
  onChangeRadioGroupValue = (event) => {
    console.log('onChangeRadioGroupValue ', event.target.value);
    this.setState({ value: event.target.value });
  }
  onChangeLabel = (event) => {
    console.log('onChangeLabel ', event.target.value);
    this.setState({ isChangedLabel: true });
    this.props.onChange({ label: event.target.value });
  }
  onChangeRadioElementLabel = (event) => {
    console.log('onChangeRadioElementLabel ', event.target.value);
    this.changeSettings(event.target, 'label');
  }
  onChangeRadioElementValue = (event) => {
    console.log('onChangeRadioElementValue ', event.target.value);
    this.changeSettings(event.target, 'value');
  }
  changeSettings = (target, key) => {
    const radios = this.props.settings.radios.slice();
    const isChanged = this.state.isChanged.slice();

    const id = parseInt(target.dataset.id, 10);
    const index = radios.findIndex(radio => radio.id === id);

    radios[index][key] = target.value;
    isChanged[index][key] = true;

    this.setState({ isChanged });
    this.props.onChange({ radios });
  };
  addRadioItem = () => {
    const radios = this.props.settings.radios.slice();
    const isChanged = this.state.isChanged.slice();

    const nextId = radios[radios.length - 1].id + 1;
    radios.push({
      label: `Radio${nextId}`,
      value: `value${nextId}`,
      id: nextId,
    });
    isChanged.push({ id: nextId, label: false, value: false });

    this.setState({ isChanged });
    this.props.onChange({ radios });
  }
  removeRadioItem = (event) => {
    console.log('removeRadioItem ', event.target.dataset.id);
    const deleteId = parseInt(event.target.dataset.id, 10);
    const radios = this.props.settings.radios.filter(radio => radio.id !== deleteId);
    const isChanged = this.state.isChanged.filter(radio => radio.id !== deleteId);
    this.setState({ isChanged });
    this.props.onChange({ radios });
  }
  render() {
    const { isEditMode, settings: { label, radios, isSaved } } = this.props;
    const isShowRemove = radios.length > 2;
    const radioItemsIsEditRender = radios.map((radio, index) => (
      <Row key={radio.id}>
        <Col span={2}>
          <Radio value={radio.value} disabled />
        </Col>
        <Col span={10}>
          <Input
            addonBefore="Label:"
            placeholder={radio.label}
            data-id={radio.id}
            value={isSaved || this.state.isChanged[index].label ? radio.label : ''}
            onChange={this.onChangeRadioElementLabel}
          />
        </Col>
        <Col span={10}>
          <Input
            addonBefore="Value:"
            placeholder={radio.value}
            data-id={radio.id}
            value={isSaved || this.state.isChanged[index].value ? radio.value : ''}
            onChange={this.onChangeRadioElementValue}
          />
        </Col>
        {isShowRemove &&
        <Col span={2}>
          <Button shape="circle" icon="minus" data-id={radio.id} onClick={this.removeRadioItem} />
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
        <RadioGroup>
          {radioItemsIsEditRender}
        </RadioGroup>
        <Button shape="circle" icon="plus" onClick={this.addRadioItem} />
      </React.Fragment>
    );
    const radioItemsNoEditRender = radios.map(radio => (
      <Radio value={radio.value} key={radio.id}>
        {radio.label}
      </Radio>
    ));
    const noEditRender = (
      <Row>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          { label }
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <RadioGroup onChange={this.onChangeRadioGroupValue} value={this.state.value}>
            {radioItemsNoEditRender}
          </RadioGroup>
        </Col>
      </Row>
    );
    return isEditMode ? isEditRender : noEditRender;
  }
}

RadioGroupElement.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    radios: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })),
    isSaved: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func, // eslint-disable-line
};

export default RadioGroupElement;
