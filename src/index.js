import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Loader } from './components/common/Loader/Loader';
import store from './store';

import './styles/global.scss';

const App = lazy(() => import('./components/pages/App/App'));

const target = document.getElementById('root');

ReactDOM.render(
  <Suspense fallback={ <Loader /> }>
    <Provider store={ store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>
  , target
);
