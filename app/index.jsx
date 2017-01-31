import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, hashHistory, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { App, HomePage, NotFound, About } from './containers';
//import routes from './routes';

render(
  //<Router history={browserHistory} routes={routes} />,
  <Router history={browserHistory}>
    <Route path="/" component={App} name="App">
      <IndexRoute component={HomePage} name='HomePage'/>
      <Route path="/about" component={About} />
    </Route>
    <Redirect from="/*" to="/" />
    <Route path="*" component={NotFound} />
  </Router>,
  document.getElementById('app')
);
