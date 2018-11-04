import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
});

class SelectFeaturedImage extends React.Component {
    constructor(props){
      super(props);
    };
    componentDidMount() {
    }
    render() {
        const { classes } = this.props;
        return(
            <Grid container spacing={8}>
              <Grid item xs={12} sm={4}>
                <Paper className={classes.paper}>none</Paper>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={8}>
                  <Grid item xs={4} sm={3}>
                    <Paper className={classes.paper} onClick={() => console.log('test')}>1</Paper>
                  </Grid>
                  <Grid item xs={4} sm={3}>
                    <Paper className={classes.paper}>2</Paper>
                  </Grid>
                  <Grid item xs={4} sm={3}>
                    <Paper className={classes.paper}>3</Paper>
                  </Grid>
                  <Grid item xs={4} sm={3}>
                    <Paper className={classes.paper}>4</Paper>
                  </Grid>
                  <Grid item xs={4} sm={3}>
                    <Paper className={classes.paper}>5</Paper>
                  </Grid>
                  <Grid item xs={4} sm={3}>
                    <Paper className={classes.paper}>6</Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
        );
    }
}

SelectFeaturedImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectFeaturedImage);
