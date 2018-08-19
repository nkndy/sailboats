import React, { Component } from 'react';
import firebase from './firebase.js';
import Slider from "react-slick";
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
            // let data = querySnapshot.data().media.map(doc => ({ data: doc.media_url }))
            // console.log(data)        
            // this.setState({
            //     data: data
            // });
            let data = [];
            querySnapshot.data().media.forEach((item) => {
                data.push(item.media_url)
            });
            this.setState({
                data: data
            });
        });
    }
    render() {
      var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      };
      return (
        <Slider {...settings}>
            {this.state.data.map(function(data, index) {
                return (
                <div key={index}>
                    <img src={data} />
                </div>
                );
            })}
        </Slider>
      );
    }
  }

class Media extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                "https://firebasestorage.googleapis.com/v0/b/sailboats-445f9.appspot.com/o/IMG_0725.JPG?alt=media&token=240bdadf-c07e-401d-a4bf-bf7ff842cdcb",
                "https://firebasestorage.googleapis.com/v0/b/sailboats-445f9.appspot.com/o/IMG_0984.JPG?alt=media&token=4ec26818-7bd8-4e9c-9257-6573c2cf0a93"
            ],
        };
    }
    render() {
        return(
            this.state.data.map((media) => {
                return (
                    <div>
                        <img src={media}/>
                    </div>
                )})
        );
    }
}

export default MediaSlider;
