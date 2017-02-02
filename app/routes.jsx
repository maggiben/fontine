import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { App, HomePage, List, NotFound, About } from './containers';

export default (
  <Route path="/" component={App} name="App">
    <IndexRoute component={List} name='List'/>
    <Route path="/about" component={About} />
    <Redirect from="/*" to="/" />
    <Route path="*" component={NotFound} />
  </Route>
);
