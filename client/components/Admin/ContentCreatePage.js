import React from 'react';
import { Row, Col, Input, List, Button, Icon } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DnDElement from './DnDElement';
import DnDEare from './DnDEare';

import editBoxHOC from './EditBoxHOC';
import InputElement from './Elements/InputElement';
import CheckboxElement from './Elements/CheckboxElement';

const elementsBox = [
  <div className="create-calculator__element"><Icon type="edit" /> Input</div>,
  <div className="create-calculator__element"><Icon type="check-square-o" /> Checkbox</div>,
  // <div className="create-calculator__element"><Icon type="plus-circle-o" /> Radio</div>,
  // <div className="create-calculator__element"><Icon type="profile" /> Select</div>,
];
const elements = [
  InputElement,
  CheckboxElement,
  // <RadioGroup>
  //   <Radio value={1}>Radio Button 1</Radio>
  //   <Radio value={2}>Radio Button 2</Radio>
  // </RadioGroup>,
  // <Select defaultValue="lucy">
  //   <Option value="jack">Jack</Option>
  //   <Option value="lucy">Lucy</Option>
  //   <Option value="disabled" disabled>Disabled</Option>
  //   <Option value="Yiminghe">yiminghe</Option>
  // </Select>,
];
const propsForElements = [
  {
    label: 'Label',
  },
  {
    label: 'Checkbox',
  },
];

class ContentCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formElements: [],
      settings: [],
    };
  }
  onHandelDrop = (indexElement) => {
    console.log(indexElement);
    const EditElementBox = editBoxHOC(
      elements[indexElement],
      this.handleSaveElement,
      this.handleDeleteElement,
    );
    const settings = propsForElements[indexElement];
    settings.isChanged = false;
    this.setState({
      formElements: [
        ...this.state.formElements,
        EditElementBox,
      ],
      settings: [
        ...this.state.settings,
        settings,
      ],
    });
  }
  handleSaveElement = (index, settings) => {
    const newSettings = this.state.settings.slice();
    newSettings[index] = { ...settings, isChanged: true };
    this.setState({ settings: newSettings });
  }
  handleDeleteElement = (index) => {
    const newSettings = this.state.settings.slice();
    newSettings.splice(index, 1);
    const newFormElements = this.state.formElements.slice();
    newFormElements.splice(index, 1);
    this.setState({ formElements: newFormElements, settings: newSettings });
  }
  render() {
    const { formElements, settings } = this.state;
    const form = (
      <List
        dataSource={formElements}
        renderItem={(EditElementBox, index) => (
          <List.Item><EditElementBox index={index} settings={settings[index]} /></List.Item>
        )}
      />
    );
    return (
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
          <DnDEare innerElements={form} isEmpty={formElements.length === 0} />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <List
            header={<h2>Elements</h2>}
            bordered
            dataSource={elementsBox}
            renderItem={(item, index) => (
              <List.Item>
                <DnDElement index={index} inner={item} onDrop={this.onHandelDrop} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  }
}

// <div className="create-calculator__drop-area">
// <div className="create-calculator__drop-area__text">Drop elements here</div>
// <Icon type="ellipsis" style={{ transform: 'rotate(90deg)' }} />
// <Icon type="ellipsis" style={{ transform: 'rotate(90deg)' }} />
// </div>

export default DragDropContext(HTML5Backend)(ContentCreatePage);
