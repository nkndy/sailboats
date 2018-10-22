import React from 'react';
import firebase, { auth } from '../firebase';
import { Redirect } from 'react-router-dom';

class AccountDialogue extends React.Component {
  // The component's Local state.
    constructor(props) {
      super(props);
      this.login = this.login.bind(this);
    }

  login() {
    // console.log(this.props);
    // console.log("Hello");
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      // ...
    });
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged(
        (user) => this.props.onUserUpdate(user)
    );
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (!this.props.user) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <button onClick={this.login}>Sign In With Google</button>
        </div>
      );
    }
    return (
      <Redirect
        to={{
          pathname: "/my-account",
        }}
      />
    );
  }
}

export default AccountDialogue;
