import React from 'react';
import { Row, Col, Input, List, Checkbox, Radio, Select, Button, Icon } from 'antd';

const RadioGroup = Radio.Group;
const { Option } = Select;

const elements = [
  <Input placeholder="Input" />,
  <Checkbox>Checkbox</Checkbox>,
  <RadioGroup>
    <Radio value={1}>Radio Button 1</Radio>
    <Radio value={2}>Radio Button 2</Radio>
  </RadioGroup>,
  <Select defaultValue="lucy">
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="disabled" disabled>Disabled</Option>
    <Option value="Yiminghe">yiminghe</Option>
  </Select>,
];
const ContentCreatePage = () => (
  <Row>
    <Col xs={24} sm={24} md={16} lg={16}>
      <Row>
        <Col xs={24} sm={24} md={8} lg={6}>New Calculator</Col>
        <Col xs={20} sm={20} md={14} lg={12}><Input placeholder="Write name for new calculator" /></Col>
      </Row>
      <br />
      <Button className="create-calculator__button" type="primary">Save</Button>
      <Button className="create-calculator__button">Save as Templates</Button>
      <Button className="create-calculator__button">Cancel</Button>
      <div className="create-calculator__drop-area">
        <div className="create-calculator__drop-area__text">Drop elements here</div>
        <Icon type="ellipsis" style={{ transform: 'rotate(90deg)' }} />
        <Icon type="ellipsis" style={{ transform: 'rotate(90deg)' }} />
      </div>
    </Col>
    <Col xs={24} sm={24} md={8} lg={8}>
      <List
        header={<h2>Elements</h2>}
        bordered
        dataSource={elements}
        renderItem={item => (<List.Item>{item}</List.Item>)}
      />
    </Col>
  </Row>
);


export default ContentCreatePage;
