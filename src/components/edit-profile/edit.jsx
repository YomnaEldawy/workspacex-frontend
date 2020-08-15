import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import MyFormRow from "./form_row";
import MyParentComponentWrapper from "./workspaceMap";
import cookie from "react-cookies";

const axios = require("axios");
const divStyle = {
  display: "flex",
};

function createData(
  name,
  streetName,
  streetNumber,
  city,
  latitude,
  longitude,
  phone,
  opensAt,
  closesAt,
  Day_to_open,
  Day_to_close
) {
  return {
    Name: name,
    StreetName: streetName,
    StreetNumber: streetNumber,
    City: city,
    latitude: latitude,
    longitude: longitude,
    Phone: phone,
    OpensAt: opensAt,
    ClosesAt: closesAt,
    DayToOpen: Day_to_open,
    DayToClose: Day_to_close,
  };
}

const rows = [];

class App extends React.Component {
  constructor(props) {
    super(props);
    try {
      var workspaceId = cookie.load("details").workspaceId;
      axios
        .get("http://workspace-x.herokuapp.com/profile/" + workspaceId)
        .then((response) => {
          console.log(response.data[0].name);
          this.setState({
            Name: response.data[0].name,
            StreetName: response.data[0].streetName,
            StreetNumber: response.data[0].streetNumber,
            City: response.data[0].city,
            latitude: response.data[0].latitude,
            longitude: response.data[0].longitude,
            Phone: response.data[0].phone,
            OpensAt: response.data[0].opensAt,
            ClosesAt: response.data[0].closesAt,
            DayToOpen: response.data[0].Day_to_open,
            DayToClose: response.data[0].Day_to_close,
            rows: response.data.map((element) => {
              return createData(
                element.name,
                element.streetName,
                element.streetNumber,
                element.city,
                element.latitude,
                element.longitude,
                element.phone,
                element.opensAt,
                element.closesAt,
                element.Day_to_open,
                element.Day_to_close
              );
            }),
          });
          console.log(this.state.Name);
        });
    } catch (err) {}
    this.state = {
      fields: [
        "Name",
        "StreetName",
        "StreetNumber",
        "City",
        "Phone",
        "OpensAt",
        "ClosesAt",
        "DayToOpen",
        "DayToClose",
      ],

      Name: "",
      StreetName: "",
      StreetNumber: "",
      City: "",
      Phone: "",
      OpensAt: "",
      ClosesAt: "",
      DayToOpen: "",
      DayToClose: "",
      longitude: "",
      latitude: "",
    };
  }

  saveWorkspaceHandler = (e) => {
    e.preventDefault();
    try {
      var workspaceId = cookie.load("details").workspaceId;

      axios
        .post(
          "http://workspace-x.herokuapp.com/profile/edit/" + workspaceId,
          this.state
        )
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {}
  };
  render() {
    const props = this.props;
    const eventhandler = (data) => {
      this.setState({ [data.textfield_name]: data.text_data });
      console.log(data.textfield_name + "::" + data.text_data);
      console.log(data);
    };

    const maphandler = (data) => {
      this.setState({ latitude: data.latitude, longitude: data.longitude });
      console.log(this.state.latitude + "::" + data.latitude);
      console.log(data);
    };

    return (
      <form>
        <Grid
          container
          item
          xs={20}
          spacing={4}
          style={{
            position: "center",
          }}
        >
          {this.state.fields.map((element) => {
            console.log(this.state[element] + "*******");
            return (
              <Grid container item xs={12} spacing={4}>
                <MyFormRow
                  name={element}
                  field_name={element}
                  field={this.state[element]}
                  xs={2}
                  spacing={3}
                  onChange={eventhandler}
                />
              </Grid>
            );
          })}
          <MyParentComponentWrapper
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            onChange={maphandler}
          />
          <Button
            className="mt-5"
            variant="contained"
            color="primary"
            size="large"
            fullWidth="true"
            onClick={this.saveWorkspaceHandler}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Grid>
      </form>
    );
  }
}
export default App;
