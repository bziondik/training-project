import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRouter from './PrivateRouter';
import AdminMainPage from '../components/Admin/AdminMainPage';
import ContentCreatePage from '../containers/Admin/ContentCreatePage';
import ContentTemplatesPage from '../containers/Admin/ContentTemplatesPage';
import ContentCalcsPage from '../containers/Admin/ContentCalcsPage';
import ContentUsersPage from '../containers/Admin/ContentUsersPage';
import ContentUserPage from '../containers/Admin/ContentUserPage';

const AdminRouter = () => (
  <Switch>
    <PrivateRouter path="/admin" exact component={AdminMainPage} />
    <PrivateRouter path="/admin/create" component={ContentCreatePage} />
    <PrivateRouter path="/admin/list" component={ContentCalcsPage} />
    <PrivateRouter path="/admin/templates" component={ContentTemplatesPage} />
    <PrivateRouter path="/admin/users/:user" component={ContentUserPage} />
    <PrivateRouter path="/admin/users" component={ContentUsersPage} />
  </Switch>
);

export default AdminRouter;
