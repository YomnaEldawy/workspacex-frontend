import React, { Component } from "react";
import Signup from "./components/staff/signup";
import Login from "./components/staff/login";
import AddWs from "./components/workspace/add";
import Table from "./components/dashboard/users-table";
import Requests from "./components/dashboard/pending-requests";
import Home from "./components/dashboard/home";

import { BrowserRouter, Route } from "react-router-dom";
class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/workspace/new" component={AddWs} />
          <Route path="/dashboard/current" component={Table} />
          <Route path="/dashboard/requests" component={Requests} />
          <Route path="/home" component={Home}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
