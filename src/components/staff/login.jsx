import React, { Component } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    message: ""
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/staff/login", this.state)
      .then(response => {
        console.log(response.data);
        if (response.data.success) {
          this.setState({ message: "" });
          this.props.history.push("/workspace/new");
        } else {
          this.setState({
            message: (
              <Alert style={{ margin: "0.8rem" }} variant="danger">
                {"Wrong E-mail or password"}
              </Alert>
            )
          });
        }
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
