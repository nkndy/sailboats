import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App.js';
import AppBar from '@material-ui/core/AppBar';
import PostsGrid from './PostsGrid.js';
import './App.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div className="body">
       <AppBar /> 
       <PostsGrid />
    </div>, 
    document.getElementById('root')
);

registerServiceWorker();