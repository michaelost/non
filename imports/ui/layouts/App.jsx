import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import Home from '../components/Home';
import Login from '../components/Login';
import App from '../components/Login';

const Main = appProps => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
    </Switch>
  </Router>
);

App.propTypes = {

};

export default Main;

