import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MapboxGL from 'mapbox-gl';

MapboxGL.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const styles = theme => ({
});

class LocationMap extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        lat: 0,
        lng: 0,
        zoom: 1.5,
      }
    };
    componentDidMount() {
      const { lng, lat, zoom } = this.state;
      const map = new MapboxGL.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [lng, lat],
        zoom
      });
    }
    render() {
        const { classes } = this.props;
        const { lng, lat, zoom } = this.state;
        return(
          <React.Fragment>
          <div>
            <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
              <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
            </div>
            <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
          </div>
          </React.Fragment>
        );
    }
}

LocationMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocationMap);
