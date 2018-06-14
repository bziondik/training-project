import React from 'react';
import PropTypes from 'prop-types';

import EditCreatePage from './EditCreate';

class DataFromStore extends React.PureComponent {
  componentDidMount() {
    if (this.props.match.params.calcid) {
      this.props.calcGetRequest(this.props.me.id, this.props.match.params.calcid);
    }
  }
  handleSave = (data) => {
    const {
      settings,
      formula,
      name,
      isTemplate,
    } = data;
    const {
      me,
      calcCreateRequest,
      calcUpdateRequest,
      calc: { id },
    } = this.props;

    if (isTemplate) {
      calcCreateRequest(me.id, {
        settings,
        formula,
        name,
        isTemplate,
      });
    } else {
      calcUpdateRequest(me.id, id, {
        settings,
        formula,
        name,
        isTemplate,
      });
    }
  }
  render() {
    if (!this.props.calc) {
      return null;
    }
    const { calc: { settings, formula, name } } = this.props;
    return (
      <EditCreatePage
        settings={settings}
        formula={formula}
        name={name}
        onSave={this.handleSave}
      />);
  }
}
DataFromStore.defaultProps = {
  calc: null,
};
DataFromStore.propTypes = {
  calc: PropTypes.shape({
    id: PropTypes.string,
    settings: PropTypes.arrayOf(PropTypes.object),
    formula: PropTypes.string,
    name: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  me: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  calcGetRequest: PropTypes.func.isRequired,
  calcCreateRequest: PropTypes.func.isRequired,
  calcUpdateRequest: PropTypes.func.isRequired,
};
export default DataFromStore;
