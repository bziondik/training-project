import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, InputNumber } from 'antd';

import { INPUT, INPUT_NUMBER } from '../../../utils/constants';

class InputElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    if (!state.isEditMode || (state.isEditMode && !props.isEditMode)) {
      return {
        isChanged: false,
        isEditMode: props.isEditMode,
      };
    }
    return {
      isEditMode: props.isEditMode,
    };
  }
  static getTypes() {
    return [INPUT, INPUT_NUMBER];
  }
  onChangeInputElementLabel = (event) => {
    console.log('onChangeInputElementLabel ', event.target.value);
    this.setState({ isChanged: true });
    this.props.onChange({ label: event.target.value });
  }
  render() {
    const { isEditMode, settings: { type, label, isSaved } } = this.props;
    const { isChanged } = this.state;
    let ComponentInput = Input;
    if (type === INPUT_NUMBER) {
      ComponentInput = InputNumber;
    }
    const isEditRender = (
      <Row>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Input
            placeholder="Label"
            name="label"
            value={isSaved || isChanged ? label : ''}
            onChange={this.onChangeInputElementLabel}
          />
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <ComponentInput disabled />
        </Col>
      </Row>
    );
    const noEditRender = (
      <Row>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          { label }
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <ComponentInput />
        </Col>
      </Row>
    );
    return isEditMode ? isEditRender : noEditRender;
  }
}

InputElement.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isSaved: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func, // eslint-disable-line
};

export default InputElement;
