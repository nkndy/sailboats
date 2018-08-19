import React, { Component } from 'react';
import firebase from './firebase.js';
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
        <div>
            {this.state.data.map(function(data, index) {
                return (
                <div key={index}>
                    <img src={data} />
                </div>
                );
            })}
        </div>
    );
    }
  }

export default MediaSlider;
