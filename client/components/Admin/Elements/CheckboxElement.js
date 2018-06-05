import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Checkbox } from 'antd';

class CheckboxElement extends React.Component {
  render() {
    const { isEditMode, settings: { label, isChanged }, onChange } = this.props;
    const isEditRender = (
      <Row type="flex" justify="start">
        <Col>
          <Checkbox disabled />
        </Col>
        <Col>
          <Input placeholder="Checkbox" name="label" value={isChanged ? label : ''} onChange={onChange} />
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
    isChanged: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func, // eslint-disable-line
};

export default CheckboxElement;
