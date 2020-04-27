import React from "react";
import { compose, withProps, lifecycle } from "recompose";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
const axios = require("axios");

global.marker_position = null;
const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw&libraries=geometry,drawing,places&key=AIzaSyA-xkiEOSnop65ZHIfEJD3GI9ZVC3-7qrQ&key=AIzaSyA-xkiEOSnop65ZHIfEJD3GI9ZVC3-7qrQ",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: "40%" }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        position: null,
        onMarkerMounted: (ref) => {
          refs.marker = ref;
        },

        onPositionChanged: () => {
          const position = refs.marker.getPosition();
          global.marker_position = refs.marker.getPosition();
          console.log(position.toString());
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: 26.820553, lng: 30.802498 }}>
    {props.isMarkerShown && (
      <Marker
        position={{ lat: 26.820553, lng: 30.802498 }}
        draggable={true}
        ref={props.onMarkerMounted}
        onPositionChanged={props.onPositionChanged}
      />
    )}
  </GoogleMap>
));

class MyParentComponentWrapper extends React.PureComponent {
  state = {
    isMarkerShown: false,
    ws_name: "ws_name",
    city: "city",
    phone: "phone",
    streetName: "streetName",
    streetNumber: "streetNumber",
    latitude: "",
    longitude: "",
    opensAt: "",
    closesAt: "",
    day_to_open: "",
    day_to_close: "",
  };

  addWorkspaceHandler = (e) => {
    this.setState(
      {
        latitude: global.marker_position.lat(),
        longitude: global.marker_position.lng(),
      },
      function () {
        e.preventDefault();
        axios
          .post("http://localhost:5000/workspace/new", this.state)
          .then((response) => {
            console.log(response.data);
          });
      }
    );
  };

  changeStateHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <MyMapComponent isMarkerShown={true} />
        <form>
          <form>
            <label>
              Warkspace name:
              <form>
                <input
                  type="text"
                  name="ws_name"
                  onChange={this.changeStateHandler}
                  placeholder="workspace name"
                />
              </form>
            </label>
          </form>
          <form>
            <label>
              Phone:
              <form>
                <input
                  type="text"
                  name="phone"
                  onChange={this.changeStateHandler}
                  placeholder="01xxxxxxxxx"
                />
              </form>
            </label>
          </form>
          <form>
            <label>
              City:
              <form>
                <input
                  type="text"
                  name="city"
                  onChange={this.changeStateHandler}
                  placeholder="city"
                />
              </form>
            </label>
          </form>
          <form>
            <label>
              Street name:
              <form>
                <input
                  type="text"
                  name="streetName"
                  onChange={this.changeStateHandler}
                  placeholder="street name"
                />
              </form>
            </label>
          </form>
          <form>
            <label>
              Street number:
              <form>
                <input
                  type="text"
                  name="streetNumber"
                  onChange={this.changeStateHandler}
                  placeholder="street number"
                />
              </form>
            </label>
          </form>
          <form>
            <label>
              Opens at:
              <form>
                <input
                  type="text"
                  name="opensAt"
                  onChange={this.changeStateHandler}
                  placeholder="hh:mm:ss"
                />
              </form>
            </label>
          </form>
          <form>
            <label>
              Closes at:
              <form>
                <input
                  type="text"
                  name="closesAt"
                  onChange={this.changeStateHandler}
                  placeholder="hh:mm:ss"
                />
              </form>
            </label>
          </form>
          <form>
            <label>
              Day to open:
              <form>
                <input
                  type="text"
                  name="Day_to_open"
                  onChange={this.changeStateHandler}
                  placeholder="ex: Sunday,Monday..etc"
                />
              </form>
            </label>
          </form>
          <form>
            <label>
              Day to close:
              <form>
                <input
                  type="text"
                  name="Day_to_close"
                  onChange={this.changeStateHandler}
                  placeholder="ex: Sunday,Monday..etc"
                />
              </form>
            </label>
          </form>
        </form>
        <div className="footer">
          <button
            onClick={this.addWorkspaceHandler}
            type="button"
            className="btn"
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default MyParentComponentWrapper;
