import React from 'react';
import Geocode from "react-geocode";
import { Map, GoogleApiWrapper } from 'google-maps-react';

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
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }
  static getDerivedStateFromProps(nextProps, prevState){
     if(nextProps.location!==prevState.location){
       return { location: nextProps.location};
    }
    else return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.location!==this.props.location){
      //Perform some operation here
      const newLocation = this.props.location;
      this.setState({location: newLocation});
    }
  }
  updateCenter = () => {
    if (this.state.location !== undefined) {
      let lat = this.state.location.latitude;
      let lng = this.state.location.longitude;
      return {
        lat: lat,
        lng: lng,
      }
    }
  }
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
          initialCenter={{
            lat: 48.4284,
            lng: -123.3656,
          }}
          center={this.updateCenter()}
          mapTypeControl={false}
          scaleControl={false}
          streetViewControl={false}
          rotateControl={false}
          fullscreenControl={false}
        >
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyA56WfgzuCmL-Qtji_kytS50CCk9QJpmIE"),
  LoadingContainer: CustomLoadingContainer,
  wrapperClassName: 'mapHeight',
})(MapContainer)
