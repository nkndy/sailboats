import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MediaSlider from './MediaSlider';
import firebase from '../firebase.js';
import Geocode from "react-geocode";
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    flexGrow: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3,
    marginTop: '70px',
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up(550 + theme.spacing.unit * 3 * 2)]: {
      marginTop: '82px',
    },
  },
  tagline: {
    textAlign: 'center',
    paddingBottom: theme.spacing.unit * 4,
    fontWeight: 'initial',
  },
  paper: {
    paddingBottom: theme.spacing.unit,
  },
});

class DetailView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        location: "",
      };
      this.getLocation = this.getLocation.bind(this);
    }
    getLocation = (lat, long) => {
      lat = lat.toString()
      long = long.toString()
      Geocode.fromLatLng(lat, long).then(
          response => {
              const address = response.results[4].formatted_address;
              this.setState({
                  location: address
              });
          },
          error => {
              //parse and return error
              console.error(error);
          }
        );
    }
    componentDidMount() {
      db.collection('Posts').doc(this.props.match.params.listingId).get()
          .then((querySnapshot) => {
          let data = querySnapshot.data();
          this.setState({
              data: data
          }, () => {
            this.getLocation(this.state.data.location.latitude, this.state.data.location.longitude);
          });
      });
    }
    render() {
    const { classes, theme } = this.props;
    return (
      <React.Fragment>
      <div className={classNames(classes.layout)}>
        <div className={classes.root}>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}><MediaSlider document_id={this.props.match.params.listingId} /></Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper} elevation={0}>
                <Typography variant="title" component="h2">
                  {this.state.data.manufacturer + " " + this.state.data.length + "'"}
                </Typography>
                <Typography variant="subheading" component="h3" gutterBottom>
                  { this.state.boat_name != null ? (this.state.location) : (this.state.data.boat_name + ", " + this.state.location)}
                </Typography>
                <Typography variant="headline" component="h4">
                  {"$" + this.state.data.asking_price}
                </Typography>
              </Paper>
              <Paper className={classes.paper} elevation={0}>
                <IconButton className={classes.button} aria-label="Email">
                  <EmailIcon fontSize="small"/>
                </IconButton>
              </Paper>
              <Paper className={classes.paper} elevation={0}>
                <Typography variant="caption" component="p">
                  {"Declared by owner to be in " + this.state.data.condition + " condition overall."}
                </Typography>
                <Typography variant="body1" component="p">
                  {this.state.data.description}
                </Typography>
              </Paper>
              <Paper className={classes.paper}>Map</Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>Description</Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>Gear</Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>Chat</Paper>
            </Grid>
          </Grid>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

DetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailView);