import React, { Component } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";

class Login extends Component {
  state = {
    email: "",
    password: "",
    message: "",
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://workspace-x.herokuapp.com/staff/login", this.state)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.setState({ message: "" });
          if (response.data.details.workspaceId) {
            cookie.save("workspaceId", response.data.details.workspaceId, {
              path: "/",
            });
            cookie.save("details", response.data.details, {
              path: "/",
            });
            this.props.history.push({
              pathname: "/sidebar",
            });
          } else {
            this.props.history.push({
              pathname: "/workspace/new",
              state: {
                userDetails: response.data.details,
                token: response.data.token,
              },
            });
          }
        } else {
          this.setState({
            message: (
              <Alert style={{ margin: "0.8rem" }} variant="danger">
                {"Wrong E-mail or password"}
              </Alert>
            ),
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          message: (
            <Alert style={{ margin: "0.8rem" }} variant="danger">
              {"Wrong E-mail or password"}
            </Alert>
          ),
        });
      });
  };
  render() {
    return (
      <Container>
        <div>{this.state.message}</div>
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
          <Button variant="primary" type="submit" onClick={this.submitHandler}>
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
