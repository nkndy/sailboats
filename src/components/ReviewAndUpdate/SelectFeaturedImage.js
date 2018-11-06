import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player'

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
    render() {
        const { classes } = this.props;
        return(
            <Grid container spacing={8}>
              <Grid item xs={12} sm={4}>
                <Paper className={classes.paper}>
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
              <Grid item xs={12} sm={8}>
                <Grid container spacing={8}>
                {this.state.imagesArray.map((image, index) => {
                  return(
                    <Grid item xs={4} sm={3} key={index} className={ (index === this.state.selectedImage) ? classes.selected : classes.notSelected } >
                      <Paper className={classes.paper} elevation={0} onClick={() => this.select(index)}>
                        <img className={classes.imgSelect} src={image.data.media_url}/>
                      </Paper>
                    </Grid>
                  )}
                )}
                </Grid>
              </Grid>
            </Grid>
        );
    }
}

SelectFeaturedImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectFeaturedImage);
