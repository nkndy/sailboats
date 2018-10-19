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
      if (this.props.data.location == null) {
        console.log('missing location')
      } else {
        Geocode.fromLatLng(
               this.props.data.location._lat,
               this.props.data.location._long
               ).then(
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
    }
    render () {
        return(

            <Grid container>
                <Grid item xs>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="title">
                                {this.props.data.year + " " + this.props.data.length + "' " + this.props.data.manufacturer + " " + this.props.data.model_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption">
                                {this.state.location}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="title" align="right">
                        {'$' + this.props.data.asking_price}
                    </Typography>
                </Grid>
            </Grid>

        );
    }
}

export default PostTitle;
