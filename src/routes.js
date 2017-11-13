import React, { Component } from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import {
  Home,
  Chat
} from './components';
import App from './App';

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/join/:domain" component={Home} />
          <Route path="/chat" component={Chat} />>
        </Route>
      </Router>
    );
  }
}
