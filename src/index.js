import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App.js';
// import AppBar from '@material-ui/core/AppBar';
// import PostsGrid from './PostsGrid.js';
// import './App.css';
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(
//     <div className="body">
//     <App />
//     </div>,
//     document.getElementById('root')
// );
//
// registerServiceWorker();

// <AppBar />
// <PostsGrid />
