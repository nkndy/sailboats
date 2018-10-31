import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class PhoneContactInput extends React.Component {
  state = {
    checked: true,
  };

  handleToggle = () => {
    console.log();
    const checked = this.state.checked;
    const newChecked = !checked;

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <ListItem role={undefined} dense button onClick={this.handleToggle}>
        <Checkbox
          checked={this.state.checked}
          tabIndex={-1}
          disableRipple
          disabled={true}
        />
        <ListItemText primary={`Phone: ${this.state.checked}`} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments">
            <CommentIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

PhoneContactInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhoneContactInput);
