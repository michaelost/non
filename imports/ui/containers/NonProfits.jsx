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
      err: null,
    }
    this.onDelete = this.onDelete.bind(this);
    this.handleChanges = this.handleChange.bind(this);
    this.saveList = this.saveList.bind(this);
  }

  componentDidMount() {
    const { rankedList } = this.props;
    debugger;
    this.setState({ rankedList });
  }

  onDelete(id) {
    const { rankedList } = this.state; 
    const list = rankedList.list.filter(el => (el !== id))
    debugger;
    rankedList.list = list;
    this.setState({ rankedList: Object.assign({}, rankedList), err: null });
  }

  componentWillReceiveProps(newProps) {
    const { rankedList, nonProfits } = newProps;
    const stateObj = {};
    if (!this.state.addToTopElement && nonProfits && nonProfits.length) {
      stateObj.addToTopElement = nonProfits[0]._id
    }
    if (rankedList && rankedList.list) {
        stateObj.rankedList = newProps.rankedList;
    }
    this.setState(stateObj)
  }

  handleChange = event => {
    debugger;
    this.setState({
      [event.target.id]: event.target.value
    });
  } 

  addToTop() {
    let { addToTopElement } = this.state; 
    const { nonProfits } = this.props;
    let { rankedList } = this.state;
    const list = (rankedList && rankedList.list || []).concat([addToTopElement]);
    if (!rankedList) {
      rankedList = { userId: Meteor.userId() } 
    }
    rankedList.list = list;
//
    const rList = rankedList && rankedList.list;
    const notInList = nonProfits.filter(np => (rList.indexOf(np._id) === -1));
    addToTopElement =  (notInList && notInList[0]._id) || null
//
    this.setState({ rankedList: Object.assign({}, rankedList ), addToTopElement, err: null, });   
  }

  saveList() {
    const { rankedList } = this.state;
    Meteor.call('updateRankedList', rankedList,  function (err, res) {
      if (err) { this.setState({err}) }
    })
  }

  renderRankedList() {
    const { nonProfits, currentUser } = this.props; 
    const { rankedList, err } = this.state;

    if (true) {
      debugger;
      const rList = rankedList && rankedList.list || []; 
      const notInList = nonProfits.filter(np => (rList.indexOf(np._id) === -1));
      return ( 
        <div>
        {err &&
          <ListGroup>
            <ListGroupItem bsStyle="danger">{err}</ListGroupItem>
          </ListGroup>
        }
          <h1> Your top ranked list or non profin organizations: </h1>
          <ListGroup componentClass="ul">
             {rList.map(npId => {
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
        {rList.length < 5 && (
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
          <Button onClick={()=>{ this.saveList() }} bsStyle="success">save list</Button>
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
