import React from 'react';
import { Row, Col, Input, List, Button, Icon, Card, Modal } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DnDElement from './DnDElement';
import DnDEare from './DnDEare';
import PreviewForm from './Elements/PreviewForm';

import editBoxHOC from './EditBoxHOC';
import InputElement from './Elements/InputElement';
import CheckboxElement from './Elements/CheckboxElement';
import RadioGroupElement from './Elements/RadioGroupElement';
import SelectElement from './Elements/SelectElement';

import * as constants from '../../utils/constants';

const elementsBox = [
  <div className="create-calculator__element"><Icon type="edit" /> Input</div>,
  <div className="create-calculator__element"><Icon type="check-square-o" /> Checkbox</div>,
  <div className="create-calculator__element"><Icon type="plus-circle-o" /> Radio</div>,
  <div className="create-calculator__element"><Icon type="profile" /> Select</div>,
];
const elements = [
  InputElement,
  CheckboxElement,
  RadioGroupElement,
  SelectElement,
];
const propsForElements = [
  constants.PROPS_INPUT,
  constants.PROPS_CHECKBOX,
  constants.PROPS_RADIO_GROUP,
  constants.PROPS_SELECT,
];

const { TextArea } = Input;

const examples = [
  'return var0 + var1 * var2',
  'return (var0 - var1) * var2',
  'return ( var0==1 ) ? var1 : var2',
];


class ContentCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formElements: [],
      settings: [],
      formula: '',
    };
  }
  onHandelDrop = (indexElement) => {
    console.log(indexElement);
    const EditElementBox = editBoxHOC(
      elements[indexElement],
      this.handleSaveElement,
      this.handleDeleteElement,
    );
    const settings = JSON.parse(JSON.stringify(propsForElements[indexElement])); // deep clone
    settings.variable = `var${this.state.formElements.length}`;
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
  onChangeFormula = (event) => {
    this.setState({ formula: event.target.value });
  };
  handleSaveElement = (index, settings) => {
    const newSettings = this.state.settings.slice();
    newSettings[index] = { ...settings, isSaved: true };
    this.setState({ settings: newSettings });
  }
  handleDeleteElement = (index) => {
    const newSettings = this.state.settings.slice();
    newSettings.splice(index, 1);
    const newFormElements = this.state.formElements.slice();
    newFormElements.splice(index, 1);
    this.setState({ formElements: newFormElements, settings: newSettings });
  }
  infoExamples = () => {
    Modal.info({
      title: 'Examples',
      content: (
        <List
          bordered
          dataSource={examples}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
      ),
    });
  }
  render() {
    const { formElements, settings, formula } = this.state;
    const form = (
      <List
        dataSource={formElements}
        renderItem={(EditElementBox, index) => (
          <List.Item><EditElementBox index={index} settings={settings[index]} /></List.Item>
        )}
      />
    );
    const variables = settings.map(elem => <li key={elem.variable}>{elem.variable}</li>);
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
          <Row>
            <Col xs={24} sm={24} md={10} lg={10}>
              <PreviewForm formElements={formElements} settings={settings} formula={formula} />
            </Col>
            <Col xs={24} sm={24} md={14} lg={14}>
              <DnDEare innerElements={form} isEmpty={formElements.length === 0} />
            </Col>
          </Row>
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
          <br />
          <Card title="Formula for calculations">
            Use your variables: <ul>{variables}</ul>
            <Button icon="info-circle-o" onClick={this.infoExamples}>Examples</Button>
            <TextArea rows={4} value={formula} onChange={this.onChangeFormula} />
          </Card>
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
