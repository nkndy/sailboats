import React from 'react';
import Select from 'react-select';
import MBXClient from '@mapbox/mapbox-sdk/services/geocoding';

const geoClient = MBXClient({ accessToken: 'pk.eyJ1IjoibnNrZW5uZWR5IiwiYSI6ImNqbm5zempteTAxcnIza29jd2hhbjNoeTQifQ.y8Z-fAMGXoCLSqfZBlQNJg' });

class LocationInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    }
  }
  options = [];
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  componentDidMount() {
    geoClient
      .forwardGeocode({
        query: 'Paris, France',
        limit: 3
      })
      .send()
      .then(response => {
        const match = (response.body.features).map((feature) => (
          {
          label: feature.place_name,
          value: feature.geometry.coordinates
          }
        ));
        this.options = match
      });
  }
  render() {
    const { selectedOption } = this.state;
    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.options}
      />
    );
  }
}

export default LocationInput;
