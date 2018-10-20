import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import AppBar from "./components/AppBar";
import Landing from "./components/Landing";
import Listings from "./components/Listings";
import NewListing from "./components/NewListing";
import Account from "./components/Account";
import AccountDialogue from "./components/AccountDialogue";
import DetailView from "./components/DetailView";
import Error from "./components/Error";
import Footer from "./components/Footer";
import firebase from './firebase.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.onUserUpdate = this.onUserUpdate.bind(this);
    this.onUserLogout = this.onUserLogout.bind(this);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
      }
    })
  }
  componentDidMount() {
  }
  onUserUpdate(user) {
    this.setState({
      user: user,
    });
  }
  onUserLogout() {
    this.setState({
      user: null,
    })
  }
  render() {
    const AccountRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        (this.state.user != null)
          ?
          <Component {...props}
            onUserLogout={this.onUserLogout}
            user_id={this.state.user.uid}
          />
          :
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
      )} />
    )
    return (
      <BrowserRouter>
        <div>
          <AppBar status={this.state} user={this.state.user}/>
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/listings" component={Listings} exact />
            <Route path="/new-sailboat-listing" component={NewListing} />
            <Route path={`/listing/:listingId`} component={DetailView}/>
            <Route
              path="/login"
              render={(props) => <AccountDialogue {...props} onUserUpdate={this.onUserUpdate} user={this.state.user} />}
            />
            <AccountRoute path="/my-account" component={Account} />
            <Route component={Error}/>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
