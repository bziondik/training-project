import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message } from 'antd';

import PrivateRouter from './PrivateRouter';
import FrontPage from '../containers/Front/FrontPage';
import AdminPage from '../containers/Admin/AdminPage';
import { clearNetworkErrors } from '../actions/network';
import {
  getIsNetworkErrorPresent,
  getNetworkError,
} from '../reducers/network';

class AppRouter extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.networkError && this.props.networkError) {
      message.error(this.props.errorMessage);
      this.props.clearNetworkErrors();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <PrivateRouter path="/admin" component={AdminPage} />
          <Route path="/" component={FrontPage} />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  }
}

AppRouter.defaultProps = {
  errorMessage: '',
};

AppRouter.propTypes = {
  networkError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  clearNetworkErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  networkError: getIsNetworkErrorPresent(state),
  errorMessage: getNetworkError(state),
});

const mapDispatchToProps = { clearNetworkErrors };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));
