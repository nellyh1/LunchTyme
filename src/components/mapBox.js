import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, GoogleApiWrapper } from "google-maps-react";



class MapContainer extends Component {
  render() {
    return (

      // renders a google map display centered in Dallas
      <Map
        google={this.props.google}
        style={{ width: "50vw", height: "30vh" }}
        zoom={14}
        intialCenter={
          {
            lat: this.props.lat,
            lng: this.props.lng
          }
        }
      />
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAMYtfMbYE5VCrDwtqCwEK4H6BIGkY6hPI'
})(MapContainer);