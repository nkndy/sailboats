import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class PostTitle extends React.Component {
    render () {
        return(
        <div>
            <Grid container>
                <Grid item xs>
                    <Typography variant="title" gutterBottom>
                        {this.props.length + "' " + this.props.manufacturer + " model name"}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="title" gutterBottom>
                        {'$' + this.props.asking_price}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <Typography variant="subheading" gutterBottom>
                        {'Posted: ' + this.props.posted_date + ", Location"}
                    </Typography>
                </Grid>
            </Grid>
        </div>
        );
    }
}

export default PostTitle;