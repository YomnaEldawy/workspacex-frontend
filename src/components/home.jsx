import React, { Component } from "react";
import SideBar from "./sidebar/sidebar";
import Login from "./staff/login";
import cookie from "react-cookies";

class Home extends Component {
  state = {};
  getContent = () => {
    if (cookie.load("details") && cookie.load("workspaceId")) {
      return <SideBar />;
    } else {
      return <Login />;
    }
  };
  render() {
    return this.getContent();
  }
}

export default Home;
