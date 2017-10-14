import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class NonProfitItem extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    const { companyName, selectedIcon } = this.props;
    return (
      <li className="list-group-item">
        <img style={{width: 40}} src={Meteor.absoluteUrl() + 'icons/' + selectedIcon } /> 
        {companyName}
      </li>
    )

    
  }
}
 
NonProfitItem.propTypes = {

};
