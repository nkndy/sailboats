import React from 'react';
import Geocode from "react-geocode";
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

// // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyA56WfgzuCmL-Qtji_kytS50CCk9QJpmIE");
// Enable or disable logs. Its optional.
// Geocode.enableDebug();

const containerStyle = {
  height: "100%",
}

const CustomLoadingContainer = (props) => (
  <div style={containerStyle}></div>
)

export class MapContainer extends React.Component {
  render() {
    const mapStyle = {
        width: "100%",
        height: "100%",
        position: "relative",
    }
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div style={mapStyle}>
        <Map
          google={this.props.google}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyA56WfgzuCmL-Qtji_kytS50CCk9QJpmIE"),
  LoadingContainer: CustomLoadingContainer,
  wrapperClassName: 'mapHeight',
})(MapContainer)
