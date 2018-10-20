import React from 'react';
import firebase from '../firebase.js';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FeaturedSlide from './FeaturedSlide';
import Slider from "react-slick";


const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

const styles = theme => ({
  tagline: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    fontWeight: 'initial',
  },
});

class FeaturedRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
  }
  componentDidMount() {
    db.collection("Posts")
    .where("featured_post", "==", true)
    .where("active_post", "==", true)
    .orderBy("posted_date", "desc")
    .get().then((querySnapshot)=>{
      let data = querySnapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))
      this.setState({
        data: data,
      })
    });
  }
  render(){
    const { classes } = this.props;
    var settings = {
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 2,
      centerMode: true,
      responsive: [
        {
          breakpoint: 1920,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <React.Fragment>
        <Typography variant="headline" component="h3" className={classNames(classes.tagline)}>
          Featured SailBoats
        </Typography>
        <div>
        <Slider {...settings}>
        {this.state.data.map((data) => {
          return(
              <FeaturedSlide key={data.id} data={data.data} document_id={data.id}/>
          )}
        )}
        </Slider>
        </div>
      </React.Fragment>
    );
  }
}

FeaturedRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeaturedRow);
