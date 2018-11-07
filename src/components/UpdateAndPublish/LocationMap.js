import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MapboxGL from 'mapbox-gl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

MapboxGL.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const styles = theme => ({
  container: {
    position: 'relative',
    height: '300px',
  }
});

class LocationMap extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        data: {},
      }
    };
    componentDidMount() {
      let lat = 1;
      let lng = 2;
      let zoom = 2;
      const map = new MapboxGL.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v9',
      });
    }
    static getDerivedStateFromProps(nextProps, prevState){
       if(nextProps.data !== prevState.data && nextProps.data !== undefined){
         return { data: nextProps.data};
      }
      else return null;
    }
    render() {
        const { classes } = this.props;
        const style = {
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          borderRadius: '3px'
        };
        const { lng, lat, zoom } = this.state;
        return(
          <Grid item xs={12} sm={4}>
              <div className={classes.container}>
                <div ref={el => this.mapContainer = el} style={style} />
              </div>
          </Grid>
        );
    }
}

LocationMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocationMap);
