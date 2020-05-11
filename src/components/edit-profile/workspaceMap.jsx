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
    loadingElement: <div style={{ height: `100%`, width: `100%` }} />,
    containerElement: <div style={{ height: `700px`, width: `1100px` }} />,
    mapElement: <div style={{ height: `100%`, width: `100%` }} />,
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
          this.setState(
            {
              latitude: global.marker_position.lat(),
              longitude: global.marker_position.lng(),
            },
            () => {
              if (this.props.onChange) {
                this.props.onChange(this.state);
              }
            }
          );
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
  >
    {props.isMarkerShown && (
      <Marker
        position={{ lat: props.latitude, lng: props.longitude }}
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
    latitude: "",
    longitude: "",
  };

  savePositionHandler = (e) => {
    this.setState(
      {
        latitude: global.marker_position.lat(),
        longitude: global.marker_position.lng(),
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state);
        }
      }
    );
  };

  render() {
    return (
      <div>
        <MyMapComponent
          latitude={this.props.latitude}
          longitude={this.props.longitude}
          isMarkerShown={true}
          onChange={this.savePositionHandler}
        />
      </div>
    );
  }
}

export default MyParentComponentWrapper;
