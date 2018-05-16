import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getIsAuthorized } from '../../reducers/auth';

class AdminRouter extends React.PureComponent {
  render() {
    const { authorized, component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => (
          authorized ? <Component {...props} /> : <Redirect to="/login" />
        )}
      />
    );
  }
}

AdminRouter.propTypes = {
  authorized: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(state => ({
  authorized: getIsAuthorized(state),
}))(AdminRouter);
