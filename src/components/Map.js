import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


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
