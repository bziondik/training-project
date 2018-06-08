import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Divider } from 'antd';

import {
  inputFormItem,
  inputNumberFormItem,
  checkboxFormItem,
  radioGroupFormItem,
  selectFormItem,
} from '../Common/FormItems';

import * as constants from '../../utils/constants';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: undefined,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Calculator Received values of form: ', values);
        const { formula } = this.props;
        if (formula) {
          const variables = Object.keys(values).join(', ');
          const variablesValues = Object.values(values).map((value) => {
            if (Number.isInteger(value) || Number.isNaN(parseFloat(value, 10))) {
              return value;
            }
            console.log(value);
            return parseFloat(value.replace(/,/, '.'), 10);
          });
          try {
            const calculate = new Function(variables, formula); // eslint-disable-line
            const result = calculate(...variablesValues);
            this.setState({ result });
          } catch (error) {
            this.setState({ result: error.message });
          }
        } else {
          this.setState({ result: 'Write formula for calculations!' });
        }
      }
    });
  }
  render() {
    const { settings, form: { getFieldDecorator } } = this.props;
    const { result } = this.state;
    const formItems = [];
    settings.forEach((element) => {
      console.log('switch ', element.type);
      switch (element.type) {
        case constants.INPUT:
          formItems.push(inputFormItem(element, getFieldDecorator, formItemLayout));
          break;
        case constants.INPUT_NUMBER:
          formItems.push(inputNumberFormItem(element, getFieldDecorator, formItemLayout));
          break;
        case constants.CHECKBOX:
          formItems.push(checkboxFormItem(element, getFieldDecorator, tailFormItemLayout));
          break;
        case constants.RADIO_GROUP:
          formItems.push(radioGroupFormItem(element, getFieldDecorator, formItemLayout));
          break;
        case constants.SELECT:
          formItems.push(selectFormItem(element, getFieldDecorator, formItemLayout));
          break;
        default:
          console.error('No such type');
      }
    });
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        {formItems}
        <FormItem {...tailFormItemLayout}>
          <Button htmlType="submit" type="primary">Calculate</Button>
        </FormItem>
        {result && <Divider>Result: {result}</Divider>}
      </Form>
    );
  }
}
Calculator.defaultProps = {
  formula: undefined,
};
Calculator.propTypes = {
  settings: PropTypes.arrayOf(PropTypes.object).isRequired,
  formula: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
    getFieldsError: PropTypes.func.isRequired,
  }).isRequired,
};
const WrappedCalculator = Form.create()(Calculator);

export default WrappedCalculator;
