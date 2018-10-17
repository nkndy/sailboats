import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 1.25,
    overflow: 'visible',
  },
  iconHover: {
  },
});

class ListingSocialIcons extends React.Component {
  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Icon className={classNames(classes.icon, 'fab fa-facebook-square')} color="disabled"/>
        <Icon className={classNames(classes.icon, 'fab fa-youtube')} color="disabled"/>
        <Icon className={classNames(classes.icon, 'fab fa-patreon')} color="disabled"/>
        <Icon className={classNames(classes.icon, 'fab fa-instagram')} color="disabled"/>
      </div>
    );
  }
}

ListingSocialIcons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListingSocialIcons);
