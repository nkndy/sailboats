import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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

function ThumnailPost(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classNames(classes.root)} elevation={1}>
        <div
          className={classNames(classes.thumbnailImage)}
          style={{
            backgroundImage: `url(${props.data.media[0].media_url})`,
            backgroundSize: `cover`,
            minWidth: 150,
          }}
        >
        </div>
        <div className={classNames(classes.content)}>
          <Typography variant="title" component="h3">
            {props.data.boat_name}
          </Typography>
          <Typography component="p">
            {props.data.description}
          </Typography>
        </div>
      </Paper>
    </div>
  );
}

ThumnailPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThumnailPost);
