import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { App, HomePage } from './containers';

export default (
  <Route path="/" component={App} name="Container">
    <IndexRoute component={HomePage} />
  </Route>
);
