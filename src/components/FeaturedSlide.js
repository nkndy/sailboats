import React from 'react';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  tagline: {
    textAlign: 'center',
    paddingBottom: theme.spacing.unit * 4,
    fontWeight: 'initial',
  },
});

class FeaturedSlide extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Paper elevation={0}>
      {/*
        <img data-lazy={
          this.props.data.media.map((media) => {
            if (media.featured_media === true) {
              return media.media_url
            }
          })
        }/>
        */}
        <img src={this.props.data.media[0].media_url} />
      </Paper>
    );
  }
}

FeaturedSlide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeaturedSlide);
