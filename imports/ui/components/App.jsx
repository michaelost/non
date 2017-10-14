import React, { Component, PropTypes } from 'react';
 import { 
  Nav, 
  NavItem, 
  PageHeader, 
  Button, 
  Panel, 
  Row, 
  Col, 
  Grid 
} from "react-bootstrap";

import NonProfits from '../containers/NonProfits.jsx';

import { Meteor } from 'meteor/meteor';

export default class App extends Component {
  constructor(props) {
    super(props); 
    this.logout = this.logout.bind(this);
  }

  logout() {
    Meteor.logout(); 
  }

  render() {
    return (
     <Grid> 
        <Row>
           <Col xs={18} md={18}>
            <Nav bsStyle="pills" activeKey={1}>
              <NavItem onClick={this.logout} eventKey={1}>logout</NavItem>
            </Nav>   
          </Col>
        </Row>
        <Row>
        </Row>
        <Row> 
          non
          {this.props.children} 
        </Row>
        <Row> 
          <NonProfits /> 
        </Row>


     </Grid> 
    );
  }
}
 
App.propTypes = {

};
