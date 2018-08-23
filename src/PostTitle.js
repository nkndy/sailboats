import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Geocode from "react-geocode";

class PostTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
        };
    }
    componentDidMount() {
        const lat = this.props.lat.toString()
        const long = this.props.long.toString()
        Geocode.fromLatLng(lat, long).then(
            response => {
                const address = response.results[2].formatted_address;
                this.setState({
                    location: address
                });
            },
            error => {
                //parse and return error
                console.error(error);
            }
          );
    }
    render () {
        return(
        <div>
            <Grid container>
                <Grid item xs className="title">
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="subheading">
                                {this.props.length + "' " + this.props.manufacturer + " " + this.props.model_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption">
                                {this.state.location}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} className="price">
                    <Typography variant="subheading" align="right">
                        {'$' + this.props.asking_price}
                    </Typography>
                </Grid>
            </Grid>
        </div>
        );
    }
}

export default PostTitle;