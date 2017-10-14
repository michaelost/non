import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';

export default class EditableNonProfitItem extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    const { companyName, selectedIcon, _id, onDelete, onChange } = this.props;
    return (
      <li className="list-group-item">
        <img style={{width: 40}} src={Meteor.absoluteUrl() + 'icons/' + selectedIcon } /> 
        {companyName}
        <Button onClick={()=>{ onDelete(_id) }} bsStyle="warning">Remove from list</Button>
      </li>
    )

    
  }
}
 
EditableNonProfitItem.propTypes = {

}
