import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AdminRoute from '../AdminRouter';
import FrontPage from '../../containers/FrontPage';
import AdminPage from '../../containers/AdminPage';
import { logoutRequest } from '../../actions/auth';
import {
  getIsNetworkErrorPresent,
  getNetworkError,
} from '../../reducers/network';

class AppRouter extends React.Component {
  render() {
    const { networkError, errorMessage } = this.props;

    return (
      <div className="container">
        {networkError && <div className="error">{errorMessage}</div>}
        <Switch>
          <AdminRoute path="/admin" component={AdminPage} />
          <Route path="/" component={FrontPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

AppRouter.defaultProps = {
  errorMessage: '',
};

AppRouter.propTypes = {
  networkError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  networkError: getIsNetworkErrorPresent(state),
  errorMessage: getNetworkError(state),
});

const mapDispatchToProps = { logoutRequest };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));
