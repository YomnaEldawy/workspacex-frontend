import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import cookie from "react-cookies";
import Events from "./eventsPage_class";

import {
  Form,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert,
} from "react-bootstrap";

const axios = require("axios");
class Event extends Component {
  state = {
    eventName: "",
    version: "",
    description: "",
    startsAt: "",
    endsAt: "",
    fees: "",
    successAlert: "",
    visibility: "invisible",
  };

  addEventHandler = (e) => {
    e.preventDefault();
    var workspaceId = cookie.load("details").workspaceId;

    axios
      .post(
        "http://workspace-x.herokuapp.com/event/new/" + workspaceId,
        this.state
      )
      .then((response) => {
        console.log(response.data);
        window.setTimeout(() => {
          this.setState({ successAlert: "" });
        }, 2000);
        this.setState({
          successAlert: (
            <Alert style={{ margin: "0.8rem" }} variant="success">
              Event added successfully
            </Alert>
          ),
        });
      });
  };

  changeStateHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setToVisible = () => {
    this.setState({ visibility: "visible" });
  };
  render() {
    return (
      <Container maxWidth="sm">
        <Events addHandler={this.setToVisible} />
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> Event name</Form.Label>
            <Form.Control
              name="eventName"
              type="text"
              placeholder="e.g. Talk about IoT"
              onChange={this.changeStateHandler}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> version</Form.Label>
            <Form.Control
              name="version"
              type="text"
              placeholder="1, 2,...etc "
              onChange={this.changeStateHandler}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Description"
              onChange={this.changeStateHandler}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> Starts at</Form.Label>
            <Form.Control
              name="startsAt"
              type="text"
              placeholder="yyyy-mm-dd hh:mm:ss"
              onChange={this.changeStateHandler}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> Ends at</Form.Label>
            <Form.Control
              name="endsAt"
              type="text"
              placeholder="yyyy-mm-dd hh:mm:ss"
              onChange={this.changeStateHandler}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label> Fees</Form.Label>
            <Form.Control
              name="fees"
              type="text"
              placeholder="e.g. 5 LE"
              onChange={this.changeStateHandler}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={this.addEventHandler}
          >
            Submit
          </Button>
          {this.state.successAlert}
        </Form>
      </Container>
    );
  }
}

export default Event;
