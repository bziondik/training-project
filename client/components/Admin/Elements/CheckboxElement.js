import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Checkbox } from 'antd';

import { CHECKBOX } from '../../../utils/constants';

class CheckboxElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    if (state.isEditMode && !props.isEditMode) {
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
    return [CHECKBOX];
  }
  onChangeCheckboxElementLabel = (event) => {
    console.log('onChangeCheckboxElementLabel ', event.target.value);
    this.setState({ isChanged: true });
    this.props.onChange({ label: event.target.value });
  }
  render() {
    const { isEditMode, settings: { label, isSaved } } = this.props;
    const { isChanged } = this.state;
    const isEditRender = (
      <Row type="flex" justify="start">
        <Col>
          <Checkbox disabled />
        </Col>
        <Col>
          <Input
            placeholder="Checkbox"
            name="label"
            value={isSaved || isChanged ? label : ''}
            onChange={this.onChangeCheckboxElementLabel}
          />
        </Col>
      </Row>
    );
    const noEditRender = (
      <Checkbox>{label}</Checkbox>
    );
    return isEditMode ? isEditRender : noEditRender;
  }
}

CheckboxElement.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    label: PropTypes.string.isRequired,
    isSaved: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func, // eslint-disable-line
};

export default CheckboxElement;
