import React, { Component } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";

class AddRoom extends Component {
  state = {
    pricePerHour: 0,
    pricePerDay: 0,
    description: "",
    seatsNumber: 0,
    successAlert: "",
  };
  submitHandler = () => {
    try {
      var workspaceId = cookie.load("details").workspaceId;
      var body = { ...this.state };
      axios
        .post("http://workspace-x.herokuapp.com/room/new", {
          ...body,
          workspaceId,
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            window.setTimeout(() => {
              this.setState({ successAlert: "" });
            }, 2000);
            this.setState({
              successAlert: (
                <Alert style={{ margin: "0.8rem" }} variant="success">
                  Room added successfully
                </Alert>
              ),
            });
          }
        })
        .catch((err) => {});
    } catch (err) {}
  };
  changeHandler = (fieldName) => {
    return (e) => {
      this.setState({ [fieldName]: e.target.value });
    };
  };
  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="hourPrice">
            <Form.Label>Price per hour</Form.Label>
            <Form.Control
              type="number"
              placeholder="25"
              onChange={this.changeHandler("pricePerHour")}
            />
          </Form.Group>
          <Form.Group controlId="dailyPrice">
            <Form.Label>Price per day</Form.Label>
            <Form.Control
              type="number"
              placeholder="140"
              onChange={this.changeHandler("pricePerDay")}
            />
          </Form.Group>
          <Form.Group controlId="numSeats">
            <Form.Label>Number of seats in the room</Form.Label>
            <Form.Control
              type="number"
              placeholder="30"
              onChange={this.changeHandler("seatsNumber")}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Room description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={this.changeHandler("description")}
            />
          </Form.Group>
          <Button variant="primary" onClick={this.submitHandler}>
            Add room
          </Button>
          <div>{this.state.successAlert}</div>
        </Form>
      </Container>
    );
  }
}

export default AddRoom;
