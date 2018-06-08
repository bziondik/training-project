import React from 'react';
import { Row, Col, Input, List, Button, Icon, Card, Modal } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

import DnDElement from './DnDElement';
import DnDEare from './DnDEare';
import PreviewForm from './Elements/PreviewForm';

import editBoxHOC from './EditBoxHOC';
import InputElement from './Elements/InputElement';
import CheckboxElement from './Elements/CheckboxElement';
import RadioGroupElement from './Elements/RadioGroupElement';
import SelectElement from './Elements/SelectElement';

import * as constants from '../../utils/constants';
import {
  getCalcDataFromLocalStorage,
  setCalcDataToLocalStorage,
  // removeCalcDataFromLocalStorage,
} from '../../utils/localStorage';

const elements = [
  {
    type: constants.INPUT,
    forList: <div className="create-calculator__element"><Icon type="edit" /> Input</div>,
    component: InputElement,
    props: constants.PROPS_INPUT,
  },
  {
    type: constants.INPUT_NUMBER,
    forList: <div className="create-calculator__element"><Icon type="edit" /> InputNumber</div>,
    component: InputElement,
    props: constants.PROPS_INPUT_NUMBER,
  },
  {
    type: constants.CHECKBOX,
    forList: <div className="create-calculator__element"><Icon type="check-square-o" /> Checkbox</div>,
    component: CheckboxElement,
    props: constants.PROPS_CHECKBOX,
  },
  {
    type: constants.RADIO_GROUP,
    forList: <div className="create-calculator__element"><Icon type="plus-circle-o" /> Radio</div>,
    component: RadioGroupElement,
    props: constants.PROPS_RADIO_GROUP,
  },
  {
    type: constants.SELECT,
    forList: <div className="create-calculator__element"><Icon type="profile" /> Select</div>,
    component: SelectElement,
    props: constants.PROPS_SELECT,
  },
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
    let saveData = getCalcDataFromLocalStorage();
    if (saveData) {
      console.log(saveData);
      saveData = JSON.parse(saveData);
      const formElements = [];
      const settings = [];
      saveData.settings.forEach((settingsForElement) => {
        const element = elements.find(elem => elem.type === settingsForElement.type);
        const EditElementBox = editBoxHOC(
          element.component,
          this.handleSaveElement,
          this.handleDeleteElement,
        );
        formElements.push(EditElementBox);
        settings.push(settingsForElement);
      });
      this.state = {
        formElements,
        settings,
        formula: saveData.formula,
        name: '',
      };
    } else {
      this.state = {
        formElements: [],
        settings: [],
        formula: '',
        name: '',
      };
    }
  }
  onHandelDrop = (type) => {
    console.log(type);
    const element = elements.find(elem => elem.type === type);
    const EditElementBox = editBoxHOC(
      element.component,
      this.handleSaveElement,
      this.handleDeleteElement,
    );
    const settings = JSON.parse(JSON.stringify(element.props)); // deep clone
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
    setCalcDataToLocalStorage(JSON.stringify({
      settings: this.state.settings,
      formula: event.target.value,
    }));
  };
  handleSaveElement = (index, settings) => {
    const newSettings = this.state.settings.slice();
    newSettings[index] = { ...settings, isSaved: true };
    this.setState({ settings: newSettings });
    setCalcDataToLocalStorage(JSON.stringify({
      settings: newSettings,
      formula: this.state.formula,
    }));
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
  handleChangeName = (event) => {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  }
  handleSaveCalc = () => {
    if (this.state.name) {
      const { settings, formula, name } = this.state;
      const { me, calcCreateRequest } = this.props;
      calcCreateRequest(me.id, { settings, formula, name });
    } // else error on input
  }
  render() {
    const {
      formElements,
      settings,
      formula,
      name,
    } = this.state;
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
            <Col xs={20} sm={20} md={14} lg={12}>
              <Input placeholder="Write name for new calculator" value={name} onChange={this.handleChangeName} />
            </Col>
          </Row>
          <br />
          <Button className="create-calculator__button" type="primary" onClick={this.handleSaveCalc}>Save</Button>
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
            dataSource={elements}
            renderItem={element => (
              <List.Item>
                <DnDElement
                  type={element.type}
                  inner={element.forList}
                  onDrop={this.onHandelDrop}
                />
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

ContentCreatePage.propTypes = {
  calcCreateRequest: PropTypes.func.isRequired,
  me: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default DragDropContext(HTML5Backend)(ContentCreatePage);
