import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainPage from '../components/Front/MainPage';
import AboutPage from '../components/Front/AboutPage';
import ExamplesPage from '../components/Front/ExamplesPage';
import ContentLoginPage from '../containers/Front/ContentLoginPage';
import ContentRegisterPage from '../containers/Front/ContentRegisterPage';

const FrontRouter = () => (
  <Switch>
    <Route path="/" exact component={MainPage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/examples" component={ExamplesPage} />
    <Route path="/login" component={ContentLoginPage} />
    <Route path="/register" component={ContentRegisterPage} />
  </Switch>
);

export default FrontRouter;
