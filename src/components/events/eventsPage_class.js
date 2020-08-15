import React, { Component } from "react";
import AllEvents from "./eventsPage";
import cookie from "react-cookies";

const axios = require("axios");
class EventsPage extends Component {
  constructor(props) {
    super(props);
    var workspaceId = cookie.load("details").workspaceId;

    axios
      .get("http://workspace-x.herokuapp.com/event/" + workspaceId)
      .then((response) => {
        console.log(response.data);
        this.setState({
          all_events: response.data,
        });
        console.log(this.state.all_events);
      });
  }
  state = {
    all_events: [],
  };
  render() {
    return (
      <AllEvents
        all_events={this.state.all_events}
        addHandler={this.props.addHandler}
      ></AllEvents>
    );
  }
}

export default EventsPage;
