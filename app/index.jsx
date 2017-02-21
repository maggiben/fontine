import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, hashHistory, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes.jsx';
//import './assets/css/photon.css';

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
);
