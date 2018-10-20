import React from 'react';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PostTitle from './PostTitle';
import ContactMethods from './ContactMethods'
import TruncatedDescription from './TruncatedDescription'
import ListingSocialIcons from './ListingSocialIcons'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

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
  button: {
    marginTop: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit * 1.75,
    width: '100%',
  },
});

class FeaturedSlide extends React.Component {
  constructor(props){
    super(props);
  }
  getFeatured = (media) => media.find((media) => (media.featured_media == true));
  render() {
    const { classes } = this.props;
    return (
      // switch this to lazy load images
      // already exists in slick slider library see lazy load settings
      <React.Fragment>
      <Paper elevation={0} className={classNames(classes.slide, classes.imageRoot)}>
        <img src={(this.getFeatured(this.props.data.media)).media_url} className={classes.featuredImg}/>
      </Paper>
      <Paper className={classes.slide} elevation={0}>
        <PostTitle data={this.props.data}/>
        <ContactMethods  data={this.props.data}/>
        <TruncatedDescription data={this.props.data}/>
        <Button size="small" color="secondary" className={classes.button} variant="contained">
          <Link to={`/listing/:${this.props.document_id}`}>
            View More
          </Link>
        </Button>
        <ListingSocialIcons data={this.props.data}/>
      </Paper>
      </React.Fragment>
    );
  }
}

FeaturedSlide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeaturedSlide);
