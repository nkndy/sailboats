import React from 'react';
import Geocode from "react-geocode";
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAFXhI5s36SfJEqv6dNDoIHjhbaHLfqwLc");
// Enable or disable logs. Its optional.
// Geocode.enableDebug();

const CustomSailboatMarker = ({ text }) => <div>{text}</div>;

function createMapOptions(maps) {
  return {
    panControl: false,
    mapTypeControl: false,
    zoomControl: false,
    scaleControl: false,
    fullscreenControl: false,
  };
}

const styles = theme => ({
  // root: {
  // },
});

class GoogleMap extends React.Component {
    static defaultProps = {
      defaultCenter: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
    constructor(props) {
      super(props);
      this.state = {
          location: {},
          data: "",
          center: {},
      };
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {
      if( prevProps.location !== this.props.location ){
        this.setState({
          location: this.props.location,
          center: {
            lat: this.props.location.lat,
            lng: this.props.location.long
          },
        });
        console.log(this.state)
      }
    }
    static getDerivedStateFromProps(nextProps, prevState){
       if( nextProps.location !== prevState.location ){
         return { location: nextProps.location };
      }
      else return null;
    }
    isEmpty() {

    }
    render() {
      return(
        <div style={{ height: '100%', width: '100%' }}>
          {this.state.location === {} ?
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyA56WfgzuCmL-Qtji_kytS50CCk9QJpmIE' }}
                defaultCenter={this.props.defaultCenter}
                defaultZoom={this.props.zoom}
                options={createMapOptions}
              >
                <CustomSailboatMarker
                  lat={this.state.location.latitude}
                  lng={this.state.location.longitude}
                  text={'Sailboat'}
                />
              </GoogleMapReact>
            :
              null
            }
        </div>
      );
    }
}

GoogleMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GoogleMap);
