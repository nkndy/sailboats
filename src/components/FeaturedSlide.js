import React from 'react';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  tagline: {
    textAlign: 'center',
    paddingBottom: theme.spacing.unit * 4,
    fontWeight: 'initial',
  },
  slide: {
    margin: theme.spacing.unit * 1.25,
    overflow: 'hidden',
  },
  featuredImg: {
    objectFit: 'cover',
  },
});

class FeaturedSlide extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      // switch this to lazy load images
      // already exists in slick slider library see lazy load settings
      <Paper elevation={0} className={classNames(classes.slide)}>
        <img src={
          this.props.data.media.map((media) => {
            if (media.featured_media === true) {
              return media.media_url
            }
          })
        } className={classes.featuredImg}/>
        <Typography variant="title" component="h3">
          {this.props.data.boat_name}
        </Typography>
      </Paper>
    );
  }
}

FeaturedSlide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeaturedSlide);
