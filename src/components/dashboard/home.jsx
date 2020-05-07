import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CheckedIn from "./users-table";
import Requests from "./pending-requests";
import { Container, Card, Button, Row, Col, Navbar } from "react-bootstrap";
import noPlaceImg from "../../no-workspace.jpg";
import axios from "axios";
import QR from "../workspace/qr";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

class Home extends Component {
  state = {
    classes: useStyles,
    value: 0,
    content: "",
    workspaceName: "Workspace name",
  };

  constructor(props) {
    super(props);
    var workspaceId = null;
    try {
      workspaceId = this.props.location.state.userDetails.workspaceId;
      axios
        .get("http://localhost:5000/workspace/" + workspaceId)
        .then((response) => {
          this.setState({ workspaceName: response.data[0].name });
        });
    } catch (err) {}
    this.setState({ workspaceId });
  }
  handleChange = (_, newValue) => {
    this.setState({ value: newValue });
    var workspaceId = null;
    try {
      workspaceId = this.props.location.state.userDetails.workspaceId;
    } catch (err) {}
    if (newValue === 0) {
      this.setState({
        content: <CheckedIn workspaceId={workspaceId} />,
      });
    } else if (newValue === 1) {
      this.setState({
        content: <Requests workspaceId={workspaceId} />,
      });
    } else if (newValue === 2) {
      this.setState({
        content: (
          <QR
            qrVal={
              "{name: " +
              this.state.workspaceName +
              ", id: " +
              workspaceId +
              "}"
            }
          ></QR>
        ),
      });
    }
  };
  render() {
    var workspaceId = null;
    try {
      workspaceId = this.props.location.state.userDetails.workspaceId;
    } catch (err) {}
    if (workspaceId) {
      return (
        <div>
          <Navbar>
            <Navbar.Brand href="#home">{this.state.workspaceName}</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as:{" "}
                <a href="#login">
                  {this.props.location.state.userDetails.firstName +
                    " " +
                    this.props.location.state.userDetails.lastName}
                </a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
          <Paper className={this.state.classes.root}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Current Customers" />
              <Tab label="Pending Requests" />
              <Tab label="My QR" />
            </Tabs>
          </Paper>
          <div>
            <Container fluid="sm">
              <Row className="justify-content-md-center" float="center">
                <Col sm={10}>{this.state.content}</Col>
              </Row>
            </Container>
          </div>
        </div>
      );
    } else {
      return (
        <Container fluid="sm">
          <Row className="justify-content-md-center" float="center">
            <Col xs={10}>
              <Card className="text-center">
                <Card.Img variant="top" src={noPlaceImg} />
                <Card.Body>
                  <Card.Text className="text-center">
                    We didn't find any workspaces for you. Would you like to add
                    a new workspace?
                  </Card.Text>
                  <Button variant="primary">ADD WORKSPACE</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default Home;
