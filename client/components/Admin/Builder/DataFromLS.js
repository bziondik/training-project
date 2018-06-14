import React from 'react';
import PropTypes from 'prop-types';

import EditCreatePage from './EditCreate';
import {
  getCalcDataFromLocalStorage,
  setCalcDataToLocalStorage,
  removeCalcDataFromLocalStorage,
} from '../../../utils/localStorage';

class DataFromLS extends React.PureComponent {
  constructor(props) {
    super(props);
    let saveData = getCalcDataFromLocalStorage();
    if (saveData) {
      console.log(saveData);
      saveData = JSON.parse(saveData);
      this.state = {
        settings: saveData.settings,
        formula: saveData.formula,
        name: saveData.name,
      };
    } else {
      this.state = {
        settings: [],
        formula: '',
        name: '',
      };
    }
  }
  handleChange = (settings, formula, name) => {
    setCalcDataToLocalStorage(JSON.stringify({ settings, formula, name }));
  }
  handleSave = (data) => {
    const {
      settings,
      formula,
      name,
      isTemplate,
    } = data;
    const { me, calcCreateRequest } = this.props;
    calcCreateRequest(me.id, {
      settings,
      formula,
      name,
      isTemplate,
    });
    removeCalcDataFromLocalStorage();
  }
  render() {
    const { settings, formula, name } = this.state;
    return (
      <EditCreatePage
        settings={settings}
        formula={formula}
        name={name}
        onChange={this.handleChange}
        onSave={this.handleSave}
      />);
  }
}
DataFromLS.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  calcCreateRequest: PropTypes.func.isRequired,
};
export default DataFromLS;
