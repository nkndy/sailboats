import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
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
      phone_number: '',
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if ( this.state !== prevState ) {
      this.props.updateParentState(this.state.phone_number);
    }
  }

  render() {
    return (
      <TextField
        id="contact-phone-input"
        label="Phone"
        type="tel"
        name="phone"
        autoComplete="off"
        margin="none"
        value={this.state.phone_number}
        onChange={this.handleChange('phone_number')}
        fullWidth
      />
    );
  }
}

class PhoneContactInput extends React.Component {
  state = {
    acceptsPhone: false,
    phone_number: '',
  };

  handleToggle = () => {
    const acceptsPhone = this.state.acceptsPhone;
    const newState = !acceptsPhone;
    this.setState({
      acceptsPhone: newState,
    });
  };

  handleInput = value => {
    this.setState({
      phone_number: value,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if ( this.state !== prevState ) {
      this.props.updateParentState(this.state);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <ListItem role={undefined} dense>
        <Checkbox
          checked={this.state.acceptsPhone}
          onClick={this.handleToggle}
        />
        <ListItemText primary={<Input updateParentState={this.handleInput} />} />
        <ListItemSecondaryAction>
          <PhoneIcon color='disabled'/>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

PhoneContactInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhoneContactInput);
