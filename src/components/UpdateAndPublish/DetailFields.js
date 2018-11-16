import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ContactMethods from '../ContactMethods';
import ListingSocialIcons from '../ListingSocialIcons';

const styles = theme => ({
});

class DetailFields extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        data: {
          location: {
            name: '',
          },
        },
      }
    };
    static getDerivedStateFromProps(nextProps, prevState){
       if(nextProps.data !== prevState.data && nextProps.data !== undefined){
         return { data: nextProps.data};
      }
      else return null;
    }
    render() {
        const { classes } = this.props;
        if (!this.state.data.location) {
          return null;
        }
        return(
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper} elevation={0}>
              <Typography variant="h6" component="h2">
                {this.state.data.manufacturer + " " + (this.state.data.model_name ? this.state.data.model_name + " " : '' ) + this.state.data.length + "'"}
              </Typography>
              <Typography variant="subtitle1" component="h3" gutterBottom>
                {this.state.data.boat_name != null ? (this.state.data.location.name) : (this.state.data.boat_name + ", " + this.state.data.location.name)}
              </Typography>
              <Typography variant="h5" component="h4" gutterBottom>
                {"$" + this.state.data.asking_price}
              </Typography>
              <ContactMethods data={this.state.data} />
              <Typography variant="caption" component="p" gutterBottom>
                {"Declared by owner to be in " + this.state.data.condition + " condition overall."}
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                {this.state.data.description}
              </Typography>
              {/*// listing social icons currently have no inputs in create listing*/}
              {/*<ListingSocialIcons />*/}
            </Paper>
          </Grid>
        );
    }
}

DetailFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailFields);
