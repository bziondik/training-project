export const INPUT = 'Input';
export const INPUT_NUMBER = 'InputNumber';
export const CHECKBOX = 'Checkbox';
export const RADIO_GROUP = 'RadioGroup';
export const SELECT = 'Select';

export const PROPS_INPUT = {
  label: 'Label',
  type: INPUT,
};

export const PROPS_INPUT_NUMBER = {
  label: 'Label',
  type: INPUT_NUMBER,
};

export const PROPS_CHECKBOX = {
  label: 'Checkbox',
  type: CHECKBOX,
};

export const PROPS_RADIO_GROUP = {
  type: RADIO_GROUP,
  label: 'RadioGroup',
  radios: [
    {
      label: 'Radio1',
      value: 'value1',
      id: 1,
    },
    {
      label: 'Radio2',
      value: 'value2',
      id: 2,
    },
  ],
};

export const PROPS_SELECT = {
  type: SELECT,
  label: 'Select',
  placeholder: 'Select ...',
  options: [
    {
      label: 'Option1',
      value: 'value1',
      id: 1,
    },
    {
      label: 'Option2',
      value: 'value2',
      id: 2,
    },
  ],
};
