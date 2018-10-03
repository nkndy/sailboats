import React, { Component } from 'react';
import firebase from './firebase.js';
import Slider from "react-slick";
import ReactPlayer from 'react-player'
import './App.css';

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

class MediaSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount() {
        db.collection('Posts').doc(this.props.document_id).get()
            .then((querySnapshot) => {
            let data = [];
            querySnapshot.data().media.forEach((item) => {
                data.push({item})
            });
            this.setState({
                data: data
            });
        });
    }
    render() {
        let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      return (
        <Slider {...settings}>
            {this.state.data.map(function(data, index) {
                if (data.item.media_type === 1) {
                  return (
                    <div key={index}>
                        <img src={data.item.media_url} />
                    </div>
                  );
                } else if (data.item.media_type === 2) {
                  return (
                    <div key={index}>
                      <ReactPlayer url={data.item.media_url} controls={true} width="100%" height="auto"/>
                    </div>
                  );
                }
            })}
        </Slider>
      );
    }
  }

export default MediaSlider;
