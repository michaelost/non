import React, { Component, PropTypes } from 'react';
 
export default class App extends Component {
  render() {
    return (
      <div>
        non
        {this.props.children} 
      </div>
    );
  }
}
 
App.propTypes = {

};
