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
    const { nonProfits }  = this.props;
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
      </div>
    );
  }
}


 
NonProfits.propTypes = {

};

export default withTracker(props => {
  const handle = Meteor.subscribe('nonProfits');

  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    nonProfits: Meteor.users.find({ 'profile.userRole': 'organization' }).fetch(),
  };
})(NonProfits);
