import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

class MediaThumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }
    componentDidMount() {
        db.collection('Posts').doc(this.props.document_id).get()
            .then((querySnapshot) => {
            let data = "";
            querySnapshot.data().media.forEach((item) => {
                if (item.featured_media) {
                    data = item.media_url
                }
            });
            this.setState({
                data: data
            });
        });
    }
    render() {
      return (
        <img src={this.state.data} />
      );
    }
  }

export default MediaThumb;
