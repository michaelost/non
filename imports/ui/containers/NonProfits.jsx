import { withTracker } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
 import { 
  Nav, 
  NavItem, 
  PageHeader, 
  Button, 
  Panel, 
  Row, 
  Col, 
  Grid,
  ListGroup
} from "react-bootstrap";

import NonProfitItem from '../components/NonProfitItem.jsx';
import RankedList from '/imports/lib/collections/rankedList/rankedlist.js';

import { Meteor } from 'meteor/meteor';

class NonProfits extends Component {
  constructor(props) {
    super(props); 
  }

  renderRankedList() {
    const { currentUser } = this.props; 
    if (currentUser.rankedList) {
    
    }
  }

  render() {
    const { nonProfits, rankedList }  = this.props;
    return (
      <div>
        <h1> List of non profit organizations: </h1>
        <ListGroup componentClass="ul">
           {nonProfits.map(np => {
             const { companyName, selectedIcon } = np.profile;
             return <NonProfitItem companyName={companyName} selectedIcon={selectedIcon} />
           })}
        </ListGroup>
        {this.renderRankedList}
        {rankedList.list}
      </div>
    );
  }
}


 
NonProfits.propTypes = {

};

export default withTracker(props => {
  const handle = Meteor.subscribe('nonProfits');
  const listHandle = Meteor.subscribe('rankedList');
  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    nonProfits: Meteor.users.find({ 'profile.userRole': 'organization' }).fetch(),
    rankedList: listHandle.ready() ? RankedList.findOne({}) : [],
  };
})(NonProfits);
