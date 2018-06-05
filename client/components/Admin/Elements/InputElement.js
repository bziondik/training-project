import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input } from 'antd';

class InputElement extends React.Component {
  render() {
    const { isEditMode, settings: { label, isChanged }, onChange } = this.props;
    const isEditRender = (
      <Row>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Input placeholder="Label" name="label" value={isChanged ? label : ''} onChange={onChange} />
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Input disabled />
        </Col>
      </Row>
    );
    const noEditRender = (
      <Row>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          { label }
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Input />
        </Col>
      </Row>
    );
    return isEditMode ? isEditRender : noEditRender;
  }
}

InputElement.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    label: PropTypes.string.isRequired,
    isChanged: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func, // eslint-disable-line
};

export default InputElement;
