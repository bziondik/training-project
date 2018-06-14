import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import Calculator from '../Common/Calculator';

class ContentUserPage extends React.PureComponent {
  componentDidMount() {
    this.props.calcGetRequest(this.props.me.id, this.props.match.params.calcid);
  }

  render() {
    if (!this.props.calc) {
      return null;
    }
    const { name, settings, formula } = this.props.calc;
    return (
      <div className="content__form">
        <Card
          title={name}
          style={{ width: 310 }}
        >
          <Calculator settings={settings} formula={formula} />
        </Card>
      </div>
    );
  }
}
ContentUserPage.defaultProps = {
  calc: null,
};
ContentUserPage.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  calc: PropTypes.shape({
    name: PropTypes.string,
    settings: PropTypes.arrayOf(PropTypes.object),
    formula: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  calcGetRequest: PropTypes.func.isRequired,
};

export default ContentUserPage;
