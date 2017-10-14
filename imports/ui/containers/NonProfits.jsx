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
  ListGroup,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";

import NonProfitItem from '../components/NonProfitItem.jsx';
import EditableNonProfitItem from '../components/EditableNonProfitItem.jsx';
import RankedList from '/imports/lib/collections/rankedList/rankedlist.js';

import { Meteor } from 'meteor/meteor';

class NonProfits extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      rankedList: {},
    }
    this.onDelete = this.onDelete.bind(this);
    this.handleChanges = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { rankedList } = this.props;
    this.setState({ rankedList });
  }

  onDelete(id) {
    const { rankedList } = this.state; 
    const list = rankedList.list.filter(el => (el !== id))
    debugger;
    rankedList.list = list;
    this.setState({ rankedList: Object.assign({}, rankedList) });
  }

  componentWillReceiveProps(newProps) {
    const { rankedList } = newProps;
    if (rankedList && rankedList.list) {
        this.setState({ rankedList: newProps.rankedList }); 
    }
  }

  componentWillRecieveNewProps() {
    this.setState({ rankedList: this.props.rankedList })
  }
 
  handleChange = event => {
    debugger;
    this.setState({
      [event.target.id]: event.target.value
    });
  } 

  addToTop() {
    const { addToTopElement, rankedList } = this.state; 
    const list = rankedList.list.concat([addToTopElement]);
    rankedList.list = list;
    this.setState({ rankedList: Object.assign({}, rankedList ), addToTopElement: null });   
  }

  renderRankedList() {
    const { nonProfits, currentUser } = this.props; 
    const { rankedList } = this.state;

    if (rankedList && rankedList.list) {
      debugger;
      const notInList = nonProfits.filter(np => (rankedList.list.indexOf(np._id) === -1));
      return ( 
        <div>
          <h1> Your top ranked list or non profin organizations: </h1>
          <ListGroup componentClass="ul">
             {rankedList.list.map(npId => {
               const currentNonProfit = nonProfits.filter((pr) => (pr._id === npId))[0];
               const { companyName, selectedIcon } = currentNonProfit && currentNonProfit.profile || {};
               return <EditableNonProfitItem
                         companyName={companyName}
                         selectedIcon={selectedIcon} 
                         onDelete={this.onDelete}
                         _id={npId}
                      />
             })}
          </ListGroup>
        {rankedList.list.length < 5 && (
          <FormGroup controlId="addToTopElement">
            <ControlLabel>Add non profit organization to your top</ControlLabel>
            <FormControl 
              componentClass="select"
              placeholder="select"
              onChange={(event) => {this.handleChange(event)}}>
                {notInList.map(el => {
                  return (<option value={el._id}>
                            {el.profile.companyName}
                          </option>)

                })} 
            </FormControl>
          <Button onClick={()=>{ this.addToTop() }} bsStyle="info">add To TOP</Button>
          </FormGroup>         
        )}
        </div>
      );
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
        {this.renderRankedList()}
      </div>
    );
  }
}


 
NonProfits.propTypes = {

};

export default withTracker(props => {
  const handle = Meteor.subscribe('nonProfits');
  const listHandle = Meteor.subscribe('rankedList', Meteor.userId());
  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    nonProfits: Meteor.users.find({ 'profile.userRole': 'organization' }).fetch(),
    rankedList: listHandle.ready() ? RankedList.findOne({}) : null,
  };
})(NonProfits);
