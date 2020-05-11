import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";

class Event extends Component {
  state = {};
  render() {
    return (
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar>E</Avatar>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" color="primary">
                {this.props.eventName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {this.props.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Starts at: {this.props.startsAt}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ends at: {this.props.endsAt}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ cursor: "pointer" }}>
                Remove
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{this.props.fees}</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default Event;
