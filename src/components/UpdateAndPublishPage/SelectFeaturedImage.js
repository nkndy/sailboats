import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player';
import Typography from '@material-ui/core/Typography';
import MediaUploader from '../NewListingPage/MediaUploader';

const styles = theme => ({
  imgSelect: {
    objectFit: 'cover',
    width: '100%',
    height: '125px',
  },
  imgFeatured: {
    objectFit: 'cover',
    width: '100%',
    height: '325px',
  },
  selected : {
    border: '2px solid black',
  },
  notSelected : {
    border: '2px solid transparent',
  },
  paper: {
    borderRadius: '0px'
  },
});

class SelectFeaturedImage extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        imagesArray: [],
        selectedImage: 0,
      }
    };
    static getDerivedStateFromProps(nextProps, prevState){
       if(nextProps.imagesArray !== prevState.imagesArray){
         return { imagesArray: nextProps.imagesArray};
      }
      else return null;
    }
    select = index => {
      this.setState({
          selectedImage: index,
      });
      this.props.setFeaturedImage(index);
    }
    hasMedia = () => {
      this.setState({
        hasNewMedia: true,
      })
    }
    render() {
        const { classes } = this.props;
        return(
          <React.Fragment>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper} elevation={0}>
                  { this.state.imagesArray.length > 0 ?
                    this.state.imagesArray[this.state.selectedImage].data.media_type === 1 ? (
                      <img className={classes.imgFeatured} src={this.state.imagesArray[this.state.selectedImage].data.media_url}/>
                    ) : (
                      <ReactPlayer url={this.state.imagesArray[this.state.selectedImage].data.media_url} controls={true} width="100%" height="auto"/>
                    )
                  :
                  //add skeleton loading element here
                  null
                  }
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={8}>
                  <Grid item xs={12} >
                    <Typography variant="caption" component="p" gutterBottom>
                      Please select your Primary Image
                    </Typography>
                  </Grid>
                  {this.state.imagesArray.map((image, index) => {
                    if ( index === 0 ) {
                      return(
                        <React.Fragment key={'fragment' + index}>
                          {/*<Grid container item xs={6} sm={4} key={'newImage' + index} justify="center" alignItems="center">
                            <Paper className={classes.addImage} elevation={0}>
                              <MediaUploader user_id={this.state.user_id} listingId={this.state.listingId} isPremium={this.state.is_premium} hasMedia={this.hasMedia} />
                            </Paper>
                          </Grid>*/}
                          <Grid item xs={6} sm={4} key={index} className={ (index === this.state.selectedImage) ? classes.selected : classes.notSelected } >
                            <Paper className={classes.paper} elevation={0} onClick={() => this.select(index)}>
                              <img className={classes.imgSelect} src={image.data.media_url}/>
                            </Paper>
                          </Grid>
                        </React.Fragment>
                      );
                    } else {
                      return(
                        <Grid container item alignItems="center" xs={6} sm={4} key={index} onClick={() => this.select(index)} className={ (index === this.state.selectedImage) ? classes.selected : classes.notSelected } >
                          <Paper className={classes.paper} elevation={0} >
                            {
                              image.data.media_type === 1 ?
                              <img className={classes.imgSelect} src={image.data.media_url}/>
                              :
                              <ReactPlayer
                                url={image.data.media_url}
                                controls={false}
                                width='100%'
                                height='auto'
                              />
                            }
                          </Paper>
                        </Grid>
                      )
                    }
                  })}
                </Grid>
              </Grid>
          </React.Fragment>
        );
    }
}

SelectFeaturedImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectFeaturedImage);
