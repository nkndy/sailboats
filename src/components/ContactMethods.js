import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import TextIcon from '@material-ui/icons/Textsms';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  contactButton: {

  },
});

class ContactMethods extends React.Component {
    constructor(props){
      super(props);
    };
    componentDidMount() {
    }
    render() {
        const { classes } = this.props;
        return(
          <React.Fragment>
            <IconButton className={classes.contactButton} aria-label="Email">
              <EmailIcon fontSize="inherit"/>
            </IconButton>
            <IconButton className={classes.contactButton} aria-label="Phone">
              <PhoneIcon fontSize="inherit"/>
            </IconButton>
            <IconButton className={classes.contactButton} aria-label="Text">
              <TextIcon fontSize="inherit"/>
            </IconButton>
          </React.Fragment>
        );
    }
}

ContactMethods.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactMethods);
