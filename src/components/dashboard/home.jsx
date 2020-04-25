import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CheckedIn from "./users-table";
import Requests from "./pending-requests";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

class Home extends Component {
  state = { classes: useStyles, value: 0, content: <CheckedIn /> };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
    if (newValue == 0) {
      this.setState({ content: <CheckedIn /> });
    } else if (newValue == 1) {
      this.setState({ content: <Requests /> });
    }
  };
  render() {
    return (
      <div>
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
          </Tabs>
        </Paper>
        <div>{this.state.content}</div>
      </div>
    );
  }
}

export default Home;
