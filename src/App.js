import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

import AppBar from "./components/AppBar";
import Home from "./components/Home";
import NewListing from "./components/NewListing";
import Error from "./components/Error";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/new-sailboat-listing" component={NewListing} />
            <Route component={Error}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
