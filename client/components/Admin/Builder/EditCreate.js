import React from 'react';
import { Row, Col, Input, List, Button, Icon, Card, Modal, Form } from 'antd';
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

import * as constants from '../../../utils/constants';

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
const FormItem = Form.Item;

const examples = [
  'return var0 + var1 * var2',
  'return (var0 - var1) * var2',
  'return ( var0==1 ) ? var1 : var2',
];

class EditCreatePage extends React.Component {
  constructor(props) {
    super(props);
    const formElements = props.settings.length > 0 ? this.createFormElements(props.settings) : [];
    this.state = {
      formElements,
      settings: props.settings,
      formula: props.formula,
      name: props.name,
      isErrorName: false,
    };
  }
  onHandelDrop = (type) => {
    console.log(type);
    const EditElementBox = this.createElement(type);
    const element = elements.find(elem => elem.type === type);
    const settings = JSON.parse(JSON.stringify(element.props)); // deep clone
    if (this.state.settings.length) {
      settings.id = this.state.settings[this.state.settings.length - 1].id + 1;
      settings.variable = `var${settings.id}`;
    } else {
      settings.id = 0;
      settings.variable = 'var0';
    }

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
    this.props.onChange(this.state.settings, event.target.value, this.state.name);
  };
  createElement = (type) => {
    const element = elements.find(elem => elem.type === type);
    return editBoxHOC(
      element.component,
      this.handleSaveElement,
      this.handleDeleteElement,
    );
  };
  createFormElements = settings => settings.map(settingsForElement => (
    this.createElement(settingsForElement.type)
  ));
  handleSaveElement = (index, settings) => {
    const newSettings = this.state.settings.slice();
    newSettings[index] = { ...settings, isSaved: true };
    this.setState({ settings: newSettings });
    if (this.props.onChange) {
      this.props.onChange(newSettings, this.state.formula, this.state.name);
    }
  }
  handleDeleteElement = (index) => {
    const newSettings = this.state.settings.slice();
    newSettings.splice(index, 1);
    const newFormElements = this.state.formElements.slice();
    newFormElements.splice(index, 1);
    this.setState({ formElements: newFormElements, settings: newSettings });
    if (this.props.onChange) {
      this.props.onChange(newSettings, this.state.formula, this.state.name);
    }
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
    this.setState({ name: event.target.value, isErrorName: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.settings, this.state.formula, event.target.value);
    }
  }
  saveCalc = (isTemplate = false) => {
    if (this.state.name) {
      const { settings, formula, name } = this.state;
      this.props.onSave({
        settings,
        formula,
        name,
        isTemplate,
      });
    } else {
      this.setState({ isErrorName: true });
    }
  }
  handleSaveCalc = () => {
    this.saveCalc();
  }
  handleSaveTemplate = () => {
    this.saveCalc(true);
  }
  render() {
    const {
      formElements,
      settings,
      formula,
      name,
      isErrorName,
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
    let propsErrorName = {};
    if (isErrorName) {
      propsErrorName = {
        validateStatus: 'error',
        help: 'Enter name for calculator',
      };
    }
    return (
      <Row>
        <Col xs={24} sm={24} md={16} lg={16}>
          <FormItem label="New Calculator" {...propsErrorName} >
            <Input placeholder="Write name for new calculator" value={name} onChange={this.handleChangeName} />
          </FormItem>
          <br />
          <Button className="create-calculator__button" type="primary" onClick={this.handleSaveCalc}>Save</Button>
          <Button className="create-calculator__button" onClick={this.handleSaveTemplate}>Save as Templates</Button>
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

EditCreatePage.defaultProps = {
  settings: [],
  formula: '',
  name: '',
  onSave: null,
  onChange: null,
};
EditCreatePage.propTypes = {
  settings: PropTypes.arrayOf(PropTypes.object),
  formula: PropTypes.string,
  name: PropTypes.string,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
};

export default DragDropContext(HTML5Backend)(EditCreatePage);
