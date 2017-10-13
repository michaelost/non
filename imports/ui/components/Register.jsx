import React, { Component } from "react";
import { PageHeader, Button, FormGroup, FormControl, ControlLabel, Panel, Row, Col, Grid } from "react-bootstrap";
import { Meteor } from 'meteor/meteor';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      logosNames: [],
      showIconSelect: false,
      selectedIcon: '',
      userRole: 'donor',
      err: null,
      success: false,
    };
    this.toggleIconSelect = this.toggleIconSelect.bind(this);
    this.changeUserRole = this.changeUserRole.bind(this);
    this.selectCompanyIcon = this.selectCompanyIcon.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    Meteor.call('icons.getIconNames', (err, res) => {
      if (res) this.setState({ logosNames: res }); 
    });
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const { userRole, selectedIcon, email, password, companyName } = this.state; 
    const userObject = { userRole, email, password };
    if (userRole == 'organization') {
      userObject.selectedIcon = selectedIcon;
      userObject.companyName = companyName;
    }
    
    // temporary
    this.showSuccessMessage();
    return
    Meteor.call('registerNewUser', userObject, (err, res) => {
      if (err) { this.setState({ err }); return; }
      this.showSuccessMessage(); 
    });
  }

  showSuccessMessage() {
    this.setState({ success: true }) 
    setTimeout(()=> {
      this.setState({ success: false }) 
    }, 3000)
  }

  changeUserRole(e) {
    const userRole = e.target.value;
    this.setState({ userRole });
  }

  toggleIconSelect() {
    const { showIconSelect } = this.state; 
    this.setState({ showIconSelect: !showIconSelect });
  }

  selectCompanyIcon(icon) {
    this.setState({ selectedIcon: icon }); 
    this.toggleIconSelect();
  }

  validateForm() {
    const { userRole, selectedIcon, email, password, companyName } = this.state; 
    const properEmail = /\S+@\S+\.\S+/.test(email);
    const properPassword = password.length > 5;
    if (userRole === 'organization' && (!selectedIcon || !companyName)) return false; 
    if (properEmail && properPassword) return true;
  }

  render() {
    const { success, err, logosNames = [], showIconSelect, selectedIcon, userRole } = this.state;
    if (success) {
      return (<PageHeader>User with email  has been successfully registered</PageHeader>);
    }
    return (
      <div className="Login">
        
        {err &&<Panel header="error" bsStyle="danger">
          {err}
        </Panel>
        }

        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          {userRole == 'organization' && 
            <FormGroup controlId="companyName" bsSize="large">
              <ControlLabel>Company name</ControlLabel>
              <FormControl
                value={this.state.companyName}
                onChange={this.handleChange}
              />
            </FormGroup>
          }
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormControl componentClass="select" placeholder="donor" onChange={(e) => {this.changeUserRole(e) }}>
            <ControlLabel>User role</ControlLabel>
            <option value="donor">donor</option>
            <option value="organization">organization</option>
          </FormControl>
          {userRole == 'organization' && 
            (<FormGroup>
              <div style={{display: 'inline-block', width: 70}}>
                { selectedIcon && <img style={{width: 40}} src={Meteor.absoluteUrl() + 'icons/' + selectedIcon } /> }
              </div>
              <Button onClick={ ()=> this.toggleIconSelect() }>
                select company logo
              </Button>
               {showIconSelect && 
                <Panel collapsible expanded={true}>
                  {logosNames.map(l => (
                    <div
                      style={{display: 'inline-block', width: 40, float: 'left', border: '1px solid black', margin: 4 }}
                      onClick={() => { this.selectCompanyIcon(l) }}>
                        <img style={{width: 40}} src={Meteor.absoluteUrl() + 'icons/' + l} />
                    </div>
                  ))}
                </Panel>
               }
            </FormGroup>)
          }
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    );
  }
}
