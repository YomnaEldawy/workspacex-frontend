import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import { Alert } from "react-bootstrap";

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
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 31.205895, lng: 29.924985 }}
  >
    {props.isMarkerShown && (
      <Marker
        position={{ lat: 31.205895, lng: 29.924985 }}
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
    this.setState({ loginDetails: this.props.location.state });
    this.setState(
      {
        latitude: global.marker_position.lat(),
        longitude: global.marker_position.lng(),
      },
      function () {
        e.preventDefault();
        axios
          .post("https://workspace-x.herokuapp.com/workspace/new", {
            ...this.state,
            loginDetails: this.props.location.state,
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.affectedRows) {
              this.setState({
                message: (
                  <Alert style={{ margin: "0.8rem" }} variant="success">
                    {"Added Successfully"}
                  </Alert>
                ),
              });
              this.props.history.push({
                pathname: "/login/",
              });
            } else {
              this.setState({
                message: (
                  <Alert style={{ margin: "0.8rem" }} variant="danger">
                    {"Error adding workspace"}
                  </Alert>
                ),
              });
            }
          });
      }
    );
    e.preventDefault();
    // console.log(this.props.location.state);
    // this.setState({ loginDetails: this.props.location.state });
    // axios({
    //   method: "POST",
    //   url: "https://workspace-x.herokuapp.com/workspace/new",
    //   data: { ...this.state, loginDetails: this.props.location.state },
    // }).then((response) => {
    //   if (response.data.affectedRows) {
    //     this.setState({
    //       message: (
    //         <Alert style={{ margin: "0.8rem" }} variant="success">
    //           {"Added Successfully"}
    //         </Alert>
    //       ),
    //     });
    //     this.props.history.push({
    //       pathname: "/login/",
    //     });
    //   } else {
    //     this.setState({
    //       message: (
    //         <Alert style={{ margin: "0.8rem" }} variant="danger">
    //           {"Error adding workspace"}
    //         </Alert>
    //       ),
    //     });
    //   }
    // });
  };

  changeStateHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
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
        <MyMapComponent isMarkerShown={true} />

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
