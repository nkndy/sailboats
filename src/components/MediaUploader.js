import React, { Component } from 'react';
import firebase from '../firebase.js';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const storage = firebase.storage();
const storageRef = storage.ref();

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

let posts = db.collection('Posts');

class MediaUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filesForUpload: [],
      media: [],
    };
  }

  handleInit () {
    //init file upload here
    // console.log( 'now initialised' , this.pond );
  }

  handleProcessing ( fieldName , file , metadata , load , error , progress , abort ) {
    // handle file upload here
    console.log();
    const fileUpload = file;
    const storageRef = firebase.storage().ref( `${this.props.user_id}/${file.name}` );
    let uploadTask = storageRef.put(fileUpload);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      console.log(snapshot);

      let lengthComputable = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progress(lengthComputable, snapshot.bytesTransferred, snapshot.totalBytes);
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    }, () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          // Set current file objects to this.state
          this.setState({
            media: [...this.state.media, {media_url: downloadURL}]
          });
          load(downloadURL);
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if ( this.state !== prevState && this.state.listingId !== null ) {
      posts.doc(this.props.listingId).set({media: this.state.media}, { merge: true }).then(() => {
      });
    }
  }

  render() {
    return(
      <FilePond allowMultiple = { true }
        ref = { ref => this.pond = ref }
        server = {
          {
            process: this.handleProcessing.bind(this),
            revert: null,
            restore: null,
            load: null,
            fetch: null,
          }
        }
        oninit = {() =>  this.handleInit()}
      >

          { this.state.filesForUpload.map( file  => (
            <File key={file} source={file} / >
          )) }

      </FilePond>
    );
  }
}

export default MediaUploader;
