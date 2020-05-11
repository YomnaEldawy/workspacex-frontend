import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
class FormRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text_enabled: undefined,
      text_disabled: "true",
      text_data: "",
      textfield_name: "",
    };
  }

  editField = () => {
    this.setState({ text_disabled: undefined });
    this.setState({ text_enabled: true });
    this.setState({ textfield_name: this.props.name });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };
  render() {
    console.log(this.props.field + "from Row");
    return (
      <React.Fragment>
        <Grid item xs={this.props.xs} spacing={this.props.spacing}>
          <label style={{ fontWeight: "bold" }}>{this.props.field_name}</label>
        </Grid>
        <Grid item spacing={this.props.spacing}>
          <TextField
            name="text_data"
            enabled={this.state.text_enabled}
            disabled={this.state.text_disabled}
            label={this.props.field}
            onChange={this.handleChange}
          ></TextField>
        </Grid>
        <Grid item xs={this.props.xs} spacing={this.props.spacing}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.editField}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

export default FormRow;
