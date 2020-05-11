import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Redirect } from "react-router-dom";
import Event from "./event";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";
import { IconButton, Grid } from "@material-ui/core";
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const AutoGridNoWrap = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.all_events.map((element) => {
        console.log(element + "*******");
        return (
          <Paper className={classes.paper}>
            <Event
              eventName={element["eventName"]}
              fees={element["fees"]}
              description={element["description"]}
              startsAt={element["startsAt"]}
              endsAt={element["endsAt"]}
            ></Event>
          </Paper>
        );
      })}

      <Paper className={classes.paper}>
        {" "}
        <IconButton
          onClick={props.addHandler}
          color="primary"
          aria-label="add to shopping cart"
          onClick={props.handler}
        >
          <AddIcon color="primary" fontSize="large" />
        </IconButton>
      </Paper>
    </div>
  );
};

class AllEvents extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    newButtonClicked: false,
  };
  newEventHandle = (e) => {
    this.setState({ newButtonClicked: true });
  };
  render() {
    return (
      <div>
        <AutoGridNoWrap
          all_events={this.props.all_events}
          handler={this.newEventHandle}
        />
      </div>
    );
  }
}
export default AllEvents;
