import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import App from '../components/App';
import PrivateRoute from '../components/PrivateRoute.jsx';

const Main = appProps => (
  <Router>
    <Switch>
      <PrivateRoute exact path="/" component={App} {...appProps} />
      <Route path="/login" component={Login}  {...appProps} />
      <Route path="/signup" component={Register}  {...appProps} />
      <PrivateRoute path="/home" component={Home} {...appProps} />
    </Switch>
  </Router>
);

Main.propTypes = {

};

const composer = (props, onData) => {
  onData(null, {
    isAuthenticated: !!Meteor.user(),
  });
};

export default composeWithTracker(composer)(Main);

