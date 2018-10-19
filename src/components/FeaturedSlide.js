import React from 'react';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PostTitle from './PostTitle';
import ContactMethods from './ContactMethods'
import Description from './Description'

const styles = theme => ({
  tagline: {
    textAlign: 'center',
    paddingBottom: theme.spacing.unit * 4,
    fontWeight: 'initial',
  },
  slide: {
    margin: theme.spacing.unit * 1.25,
    overflow: 'hidden',
    maxWidth: '600px',
  },
  imageRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: '0px',
    borderBottomLeftRadius: '0px',
  },
  featuredImg: {
    objectFit: 'cover',
    height: '300px',
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      height: '400px',

    },
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
      <React.Fragment>
      <Paper elevation={0} className={classNames(classes.slide, classes.imageRoot)}>
        <img src={
          this.props.data.media.map((media) => {
            if (media.featured_media === true) {
              return media.media_url
            }
          })
        } className={classes.featuredImg}/>
      </Paper>
      <Paper className={classes.slide} elevation={0}>
        <PostTitle data={this.props.data}/>
        <ContactMethods  data={this.props.data}/>
        <Description data={this.props.data}/>
      </Paper>
      </React.Fragment>
    );
  }
}

FeaturedSlide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeaturedSlide);
