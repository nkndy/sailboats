import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import firebase, { auth } from './components/firebase';
import AppBar from "./components/AppBar";
import Home from "./components/Home";
import NewListing from "./components/NewListing";
import Account from "./components/Account";
import AccountDialogue from "./components/AccountDialogue";
import Error from "./components/Error";
import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.onUserUpdate = this.onUserUpdate.bind(this);
    this.onUserLogout = this.onUserLogout.bind(this);
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
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        (this.state.user != null)
          ?
          <Component {...props}
            onUserLogout={this.onUserLogout}
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
          <AppBar status={this.state}/>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/new-sailboat-listing" component={NewListing} />
            <Route
              path="/login"
              render={(props) => <AccountDialogue {...props} onUserUpdate={this.onUserUpdate} user={this.state.user} />}
            />
            <PrivateRoute path="/my-account" component={Account} />
            <Route component={Error}/>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
