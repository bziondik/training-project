import React from 'react';
import PropTypes from 'prop-types';

import Calculator from '../../../Common/Calculator';

class PreviewForm extends React.Component {
  handleSubmit = (values) => {
    console.log('PreviewForm Received values of form: ', values);
  }
  render() {
    const { settings, formula } = this.props;
    return (
      <div className="create-calculator__preview">
        { settings.length ? (
          <Calculator settings={settings} formula={formula} onSubmit={this.handleSubmit} />
          ) : 'Preview Calculator' }
      </div>
    );
  }
}
PreviewForm.propTypes = {
  settings: PropTypes.arrayOf(PropTypes.object).isRequired,
  formula: PropTypes.string.isRequired,
};

export default PreviewForm;
