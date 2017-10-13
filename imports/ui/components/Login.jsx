import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Meteor } from 'meteor/meteor';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      err: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const { email, password } = this.state; 
    Meteor.loginWithPassword(email, password, (err)=> {
      if (err) { 
        this.setState({ err: err.reason });
      }
    });     
  }

  validateForm() {
    const { email, password } = this.state; 
    const properEmail = /\S+@\S+\.\S+/.test(email);
    const properPassword = password.length > 5;
    if (properEmail && properPassword) return true;
  }
  render() {
    const { err } = this.state;
    return (
      <div className="Login">
        {err &&
          <ListGroup>
            <ListGroupItem bsStyle="danger">{err}</ListGroupItem>
          </ListGroup>
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
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
