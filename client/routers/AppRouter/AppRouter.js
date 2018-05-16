import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AdminRoute from '../AdminRouter';
import FrontPage from '../../containers/FrontPage';
import AdminPage from '../../containers/AdminPage';
import { logout } from '../../actions/auth';
import { getIsAuthorized } from '../../reducers/auth';
import {
  getIsNetworkErrorPresent,
  getNetworkError,
} from '../../reducers/network';

class AppRouter extends React.Component {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { authorized, networkError, errorMessage } = this.props;

    return (
      <div className="container">
        {authorized && (
          <button className="logout" onClick={this.handleLogout}>
            Logout
          </button>
        )}
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
  logout: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
  networkError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  authorized: getIsAuthorized(state),
  networkError: getIsNetworkErrorPresent(state),
  errorMessage: getNetworkError(state),
});

const mapDispatchToProps = { logout };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));
