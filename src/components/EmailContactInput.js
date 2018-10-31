import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user_email,
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if ( this.state !== prevState ) {
      this.props.updateParentState(this.state.email);
    }
  }

  render() {
    return (
      <TextField
        id="contact-email-input"
        label="Email"
        type="email"
        name="email"
        autoComplete="off"
        margin="none"
        value={this.state.email}
        onChange={this.handleChange('email')}
        fullWidth
      />
    );
  }
}

class EmailContactInput extends React.Component {
  state = {
    checked: true,
    email: '',
  };

  handleToggle = () => {
    const checked = this.state.checked;
    const newChecked = !checked;
    this.setState({
      checked: newChecked,
    });
  };

  handleInput = (value) => {
    this.setState({
      email: value,
    })
  }

  render() {
    return (
      <ListItem role={undefined} dense>
        <Checkbox
          checked={this.state.checked}
          onClick={this.handleToggle}
        />
        <ListItemText primary={<Input updateParentState={this.handleInput} user_email={this.props.user_email} />} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments">
            <CommentIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

EmailContactInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailContactInput);
