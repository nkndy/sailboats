import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App.js';
import PostsGrid from './PostsGrid.js';
import './App.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <PostsGrid />, 
    document.getElementById('root')
);

registerServiceWorker();