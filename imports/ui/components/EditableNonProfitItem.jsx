import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { 
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

export default class EditableNonProfitItem extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      position: this.props.currentPosition,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value, id } = e.target;
    debugger;
    this.setState({[id]: parseInt(value)});
  }

  componentWillReceiveProps(newProps) {
    const { currentPosition } = newProps;
    debugger;
    if (currentPosition) { 
      this.setState({ position: currentPosition }); 
    }
  }

  handleSubmit(e) {
    e.preventDefault(); 
    const { changePosition, currentPosition } = this.props;
    const { position } = this.state;
    debugger;
    changePosition(currentPosition, position);
  }

  render() {
    const { 
      companyName, 
      selectedIcon, 
      _id, 
      onDelete, 
      onChange,
      changePosition,
      rLength,
    } = this.props;
    const options = Array.apply(null, {length: rLength}).map(Number.call, Number)
    const { position } = this.state;
    return (
      <li className="list-group-item">
        <img style={{width: 40}} src={Meteor.absoluteUrl() + 'icons/' + selectedIcon } /> 
        {companyName}
        <Button onClick={()=>{ onDelete(_id) }} bsStyle="warning btn-remove">Remove from list</Button>
          <FormGroup 
            controlId="position"
            bsClass="select-position">
            <FormControl
              bsClass="option"
              componentClass="select"
              placeholder="change item`s position"
              onChange={this.handleChange}
              controlId="select"
              value={position}
            >
              <ControlLabel>change position</ControlLabel>
              {options.map(el => {
                return <option value={el}>{el+1}</option>
              })}
            </FormControl>
          </FormGroup>
        {' '}
        <Button 
          type="submit"
           bsClass="btn" 
          onClick={this.handleSubmit}>
          Change position
        </Button>
      </li>
    )

    
  }
}
 
EditableNonProfitItem.propTypes = {

}
