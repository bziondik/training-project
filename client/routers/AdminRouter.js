import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRouter from './PrivateRouter';
import AdminMainPage from '../components/Admin/AdminMainPage';
import CreatePage from '../components/Admin/CreatePage';
import TempatesPage from '../components/Admin/TemplatesPage';
import ListPage from '../components/Admin/ListPage';
import UsersPage from '../components/Admin/UsersPage';

const AdminRouter = () => (
  <Switch>
    <PrivateRouter path="/admin" exact component={AdminMainPage} />
    <PrivateRouter path="/admin/create" component={CreatePage} />
    <PrivateRouter path="/admin/list" component={ListPage} />
    <PrivateRouter path="/admin/templates" component={TempatesPage} />
    <PrivateRouter path="/admin/users" component={UsersPage} />
  </Switch>
);

export default AdminRouter;