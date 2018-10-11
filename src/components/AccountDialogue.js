import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { auth, google } from './firebase';
import Account from './Account'

class AccountDialogue extends React.Component {
  // The component's Local state.
    constructor() {
      super();
      this.state = {
        currentItem: '',
        username: '',
        items: [],
        user: null // <-- add this line
      }
    }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google
    signInOptions: [
      google
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (result) => {
        const user = result.user;
        this.setState({
          user
        });
      }
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
          this.setState({ user })
      }
    });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.user) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {auth.currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => auth.signOut()}>Sign-out</a>
      </div>
    );
  }
}

export default AccountDialogue;

// /* eslint-disable react/no-multi-comp */
//
// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Avatar from '@material-ui/core/Avatar';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Dialog from '@material-ui/core/Dialog';
// import PersonIcon from '@material-ui/icons/Person';
// import AddIcon from '@material-ui/icons/Add';
// import Typography from '@material-ui/core/Typography';
// import blue from '@material-ui/core/colors/blue';
//
// const styles = {
//   avatar: {
//     backgroundColor: blue[100],
//     color: blue[600],
//   },
// };
//
// class SignUpForm extends React.Component {
//   handleClose = () => {
//     this.props.onClose(this.props.selectedValue);
//   };
//
//   handleListItemClick = value => {
//     this.props.onClose(value);
//   };
//
//   render() {
//     const { classes, onClose, selectedValue, ...other } = this.props;
//
//     return (
//       <Dialog onClose={this.handleClose} aria-labelledby="account-dialogue" {...other}>
//         <DialogTitle id="account-dialogue">Login Or Create an Account</DialogTitle>
//         <div>
//           <List>
//             <ListItem button onClick={() => this.handleListItemClick('createAccount')}>
//               <ListItemAvatar>
//                 <Avatar>
//                   <AddIcon />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText primary="Create account" />
//             </ListItem>
//           </List>
//         </div>
//       </Dialog>
//     );
//   }
// }
//
// SignUpForm.propTypes = {
//   classes: PropTypes.object.isRequired,
//   onClose: PropTypes.func,
//   selectedValue: PropTypes.string,
// };
//
// const AccountDialogueWrapped = withStyles(styles)(SignUpForm);
//
// class AccountDialogue extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: this.props.showAccountDialogue
//     };
//   }
//
//   componentWillReceiveProps(nextProps){
//     console.log(nextProps.showAccountDialogue)
//     if(nextProps.showAccountDialogue !== this.props.showAccountDialogue){
//         this.setState({open: nextProps.showAccountDialogue});
//     }
//   }
//
//   handleClose = value => {
//     this.setState({ open: false });
//   };
//
//   render() {
//     return (
//       <div>
//         <AccountDialogueWrapped
//           open={this.state.open}
//           onClose={this.handleClose}
//         />
//       </div>
//     );
//   }
// }
//
// export default AccountDialogue;
