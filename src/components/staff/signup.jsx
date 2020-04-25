import React, { Component } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    message: ""
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/staff/signup", this.state)
      .then(response => {
        console.log(response.data);
        if (response.data.success) {
          this.props.history.push("/login");
          console.log("success");
        } else {
          this.setState({
            message: (
              <Alert style={{ margin: "0.8rem" }} variant="danger">
                {response.data.reason}
              </Alert>
            )
          });
        }
      });
  };

  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={this.changeHandler}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.changeHandler}
            />
          </Form.Group>

          <Form.Group controlId="formFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="name"
              placeholder="John"
              name="firstName"
              onChange={this.changeHandler}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Doe"
              name="lastName"
              onChange={this.changeHandler}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.submitHandler}>
            Submit
          </Button>
        </Form>
        <div>{this.state.message}</div>
      </Container>
    );
  }
}

export default Signup;
