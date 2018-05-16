import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainPage from '../../components/Front/MainPage';
import AboutPage from '../../components/Front/AboutPage';
import ExamplesPage from '../../components/Front/ExamplesPage';
import LoginForm from '../../components/Front/LoginForm';

const FrontRouter = () => (
  <Switch>
    <Route path="/" exact component={MainPage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/examples" component={ExamplesPage} />
    <Route path="/login" component={LoginForm} />
  </Switch>
);

export default FrontRouter;
