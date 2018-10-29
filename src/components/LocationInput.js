import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import MBXClient from '@mapbox/mapbox-sdk/services/geocoding';

const geoClient = MBXClient({ accessToken: 'pk.eyJ1IjoibnNrZW5uZWR5IiwiYSI6ImNqbm5zempteTAxcnIza29jd2hhbjNoeTQifQ.y8Z-fAMGXoCLSqfZBlQNJg' });

let match = []

const geoCall = input =>
  geoClient
  .forwardGeocode({
    query: 'paris france',
    limit: 3
  })
  .send()
  .then(response => {
    console.log(input);
    match = (response.body.features).map((feature) => (
      {
      label: feature.place_name,
      value: feature.geometry.coordinates
      }
    ));
    console.log(match);
});

type State = {
  inputValue: string,
};

const filterLocations = match;

// const filterLocations = (inputValue: string) =>
//   match.filter(i =>
//     i.label.toLowerCase().includes(inputValue.toLowerCase())
//   );

const promiseOptions = inputValue =>
  new Promise(resolve => {
    // setTimeout(() => {
    //   resolve(filterLocations(inputValue));
    // }, 1000);
    geoCall(() => {
      resolve(filterLocations(inputValue));
    });
  });

export default class WithPromises extends Component<*, State> {
  state = { inputValue: '' };
  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
      <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
    );
  }
}
