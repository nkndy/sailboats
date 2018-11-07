import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import TextIcon from '@material-ui/icons/Textsms';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  contactButtonWrapper: {
    marginTop: theme.spacing.unit * 1.25,
    marginBottom: theme.spacing.unit * 1.5,
  },
});

class ContactMethods extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
      }
    }
    static getDerivedStateFromProps(nextProps, prevState){
       if(nextProps.data !== prevState.data && nextProps.data !== undefined){
         return { data: nextProps.data};
      }
      else return null;
    }
    render() {
        const { classes } = this.props;
        return(
          <div className={classes.contactButtonWrapper}>
            {
                this.state.data.accepts_email
                ?
                <IconButton className={classes.contactButton} aria-label="Email">
                  <EmailIcon fontSize="inherit"/>
                </IconButton>
                :
                ''
            }
            {
                this.state.data.accepts_phone
                ?
                <IconButton className={classes.contactButton} aria-label="Phone">
                  <PhoneIcon fontSize="inherit"/>
                </IconButton>
                :
                ''
            }
            {/*
              Add SMS
            <IconButton className={classes.contactButton} aria-label="Text">
                <TextIcon fontSize="inherit"/>
            </IconButton>
            */}
          </div>
        );
    }
}

ContactMethods.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactMethods);
