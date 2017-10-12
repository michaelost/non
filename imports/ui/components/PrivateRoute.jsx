import React, { Component, PropTypes } from 'react';

import {
  Route,
  Redirect,
} from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, ...params }) => (
  <Route {...params} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute;
