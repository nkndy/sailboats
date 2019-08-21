import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';

import { auth } from './firebase.js';

import AppBar from "./components/AppBar";
import Landing from "./components/LandingPage/Landing";
import Listings from "./components/ListingsPage/Listings";
import CreateListing from "./components/NewListingPage/CreateListing";
import ReviewListing from "./components/UpdateAndPublishPage/ReviewListing";
import Account from "./components/AccountPage/Account";
import AccountDialogue from "./components/AccountDialogue";
import DetailView from "./components/DetailPage/DetailView";
import Error from "./components/Error";
import Footer from "./components/Footer";
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.onUserUpdate = this.onUserUpdate.bind(this);
    this.onUserLogout = this.onUserLogout.bind(this);
  }
  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged(
        (user) => this.setState({ user: user })
    );
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
    if (!this.state.user) {
      return null
    }
    return (
      <BrowserRouter>
        <div>
          <AppBar status={this.state} user={this.state.user}/>
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/listings" component={Listings} exact />
            <Route path={`/listing/:listingId`} component={DetailView} />
            <Route path={`/review-listing/:listingId`} component={ReviewListing} />
            <Route
              path="/login"
              render={(props) => <AccountDialogue {...props} onUserUpdate={this.onUserUpdate} user={this.state.user} />}
            />
            <PrivateRoute 
              path="/new-sailboat-listing" 
              component={CreateListing}
              onUserLogout={this.onUserLogout}
              user={this.state.user}
            />
            <PrivateRoute
              path="/my-account" 
              component={Account}
              onUserLogout={this.onUserLogout}
              user_id={this.state.user.uid}
            />
            <Route component={Error}/>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
