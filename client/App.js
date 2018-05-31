import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import createStore from './utils/store';
import AppRouter from './routers/AppRouter';

const store = createStore();

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </BrowserRouter>
);

export default App;
