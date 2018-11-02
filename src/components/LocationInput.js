import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import MBXClient from '@mapbox/mapbox-sdk/services/geocoding';

const geoClient = MBXClient({ accessToken: 'pk.eyJ1IjoibnNrZW5uZWR5IiwiYSI6ImNqbm5zempteTAxcnIza29jd2hhbjNoeTQifQ.y8Z-fAMGXoCLSqfZBlQNJg' });

let locationResults = [];

const filterColors = (inputValue) =>
  locationResults.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const locationOptions = (inputValue, callback) => {
  if (inputValue) {
    geoClient
    .forwardGeocode({
      query: inputValue,
      limit: 5,
    })
    .send()
    .then(response => {
      locationResults = (response.body.features).map((feature) => (
        {
        label: feature.place_name,
        value: feature.geometry.coordinates
        }
      ));
      callback(filterColors(inputValue));
    });
  }
};

export default class LocationInput extends Component {
  constructor(props){
    super(props);
    this.state = '';
  }

  handleInputChange = (newValue) => {
    const inputValue = newValue;
    this.setState({ inputValue });
    return inputValue;
  };

  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={locationOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          onChange={opt => this.props.updateLocation(opt)}
          name="location"
          placeholder="Start Typing a location"
        />
      </div>
    );
  }
}
