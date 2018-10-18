import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PostTitle from './PostTitle.js';
import MediaSlider from './MediaSlider.js';
import Condition from './Condition.js';
import Description from './Description.js';
import PostDetails from './PostDetails.js';

const styles = theme => ({
  root: {
    overflow: 'hidden',
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
  },
  content: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
  },
  thumbnailImage: {
    backgroundSize: `cover`,
    minWidth: 150,
    backgroundColor: 'grey',
  },
});

function parseDate(date) {
    const dateObject = moment.unix((date.seconds));
    return dateObject.format("MMMM Do YYYY")
}

function FeaturedPost(props) {
  const { classes } = props;
  return (
    <Paper className={classNames(classes.root)} elevation={1}>
      <div>
        <MediaSlider document_id={props.document_id}/>
      </div>
      <PostTitle
          asking_price={props.data.asking_price}
          manufacturer={props.data.manufacturer}
          length={props.data.length}
          lat={props.data.location.latitude}
          long={props.data.location.longitude}
          model_name={props.data.model_name}
      />
      {/*
        <PostDetails
            posted_date={parseDate(props.data.posted_date)}
            lat={props.data.location.latitude}
            long={props.data.location.longitude}
        />
        <Condition condition={props.data.condition} boat_name={props.data.boat_name} />
        <Description description={props.data.description}/>
        */}
    </Paper>
  );
}

FeaturedPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeaturedPost);
