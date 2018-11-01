import React, { Component } from 'react';
import firebase from '../firebase.js';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

//https://medium.com/equinox-blog/%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B9%83%E0%B8%8A%E0%B9%89-react-cloud-storage-for-firebase-%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%96%E0%B8%AD%E0%B8%B0-fb62f897e357

var storage = firebase.storage();
var storageRef = storage.ref();

class MediaUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }
  handleInit () {
    // xử lý init file upload here
    console . log ( ' now initialised ' , this.pond );
  }

  handleProcessing ( fieldName , file , metadata , load , error , progress , abort ) {
    // handle file upload here
    console . log ( " handle file upload here " );
    console . log (file);
  }
  render() {
    return(
      <FilePond allowMultiple = { true }
        maxFiles = {3}
        ref = { ref => this.pond = ref }
        server = {{process: this.handleProcessing.bind(this)}}
        oninit = {() =>  this.handleInit()} >

          { this.state.files.map( file  => (
            <File key={file} source={file} / >
          )) }

      </FilePond>
    );
  }
}

export default MediaUploader;
