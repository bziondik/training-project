import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRouter from './PrivateRouter';
import FrontPage from '../containers/Front/FrontPage';
import AdminPage from '../containers/Admin/AdminPage';

const AppRouter = () => (
  <React.Fragment>
    <Switch>
      <PrivateRouter path="/admin" component={AdminPage} />
      <Route path="/" component={FrontPage} />
      <Redirect to="/" />
    </Switch>
  </React.Fragment>
);

export default AppRouter;
