import React from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class ResetPasswordForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSubmit(values);
      }
    });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(<Input type="password" />)}
        </FormItem>
        <FormItem
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Reset Password</Button>
        </FormItem>
      </Form>
    );
  }
}
ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
    getFieldsError: PropTypes.func.isRequired,
  }).isRequired,
};
const WrappedResetPasswordForm = Form.create()(ResetPasswordForm);

export default WrappedResetPasswordForm;
