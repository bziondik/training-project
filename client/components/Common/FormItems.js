import React from 'react';
import { Form, Input, InputNumber, Checkbox, Radio, Select } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;

export function inputFormItem(settings, getFieldDecorator, formItemLayout) {
  return (
    <FormItem
      {...formItemLayout}
      label={settings.label}
      key={settings.variable}
    >
      {getFieldDecorator(settings.variable)(<Input />)}
    </FormItem>
  );
}

export function inputNumberFormItem(settings, getFieldDecorator, formItemLayout) {
  return (
    <FormItem
      {...formItemLayout}
      label={settings.label}
      key={settings.variable}
    >
      {getFieldDecorator(settings.variable)(<InputNumber />)}
    </FormItem>
  );
}

export function checkboxFormItem(settings, getFieldDecorator, formItemLayout) {
  return (
    <FormItem
      {...formItemLayout}
      value={false}
      key={settings.variable}
    >
      {getFieldDecorator(settings.variable)(<Checkbox>{settings.label}</Checkbox>)}
    </FormItem>
  );
}

export function radioGroupFormItem(settings, getFieldDecorator, formItemLayout) {
  return (
    <FormItem
      {...formItemLayout}
      label={settings.label}
      key={settings.variable}
    >
      {getFieldDecorator(settings.variable)( // eslint-disable-line
        <RadioGroup>
          {settings.radios.map(radio => (
            <Radio value={radio.value} key={radio.id}>{radio.label}</Radio>
          ))}
        </RadioGroup>)}
    </FormItem>
  );
}

export function selectFormItem(settings, getFieldDecorator, formItemLayout) {
  return (
    <FormItem
      {...formItemLayout}
      label={settings.label}
      key={settings.variable}
    >
      {getFieldDecorator(settings.variable)( // eslint-disable-line
        <Select placeholder={settings.placeholder}>
          {settings.options.map(option => (
            <Option value={option.value} key={option.id}>{option.label}</Option>
          ))}
        </Select>)}
    </FormItem>
  );
}
