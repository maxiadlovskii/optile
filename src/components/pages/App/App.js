import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { links } from '../../../constants/routerLinks';

import '../../../styles/global.scss';
import styles from './App.module.scss';

const Weather = lazy(() => import('../Weather/Weather'));

const routes = [
  { path: `${links.WEATHER}`, component: Weather }
];

const App = () => (
  <div className={ styles.App }>
    <Switch>
      {
        routes.map(({ path, component }) => <Route key={ path } path={ path } component={ component } />)
      }
      <Redirect to={ links.WEATHER } />
    </Switch>
  </div>
);

export default App;
