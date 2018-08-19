import React from 'react';
import Geocode from "react-geocode";

// // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAFXhI5s36SfJEqv6dNDoIHjhbaHLfqwLc");
// Enable or disable logs. Its optional.
Geocode.enableDebug();

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }
    componentDidMount() {
        const lat = this.props.lat.toString()
        const long = this.props.long.toString()
        Geocode.fromLatLng(lat, long).then(
            response => {
                const address = response.results[2].formatted_address;
                this.setState({
                    data: address
                });
            },
            error => {
                //parse and return error
                console.error(error);
            }
          );
    }
    render() {
        return(
            <div>{this.state.data}</div>
        );
    }
}

export default Map;