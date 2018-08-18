import React from 'react';
import ReactDOM from 'react-dom';
import 'moment'
// import App from './App.js';
import firebase from './firebase.js';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
var moment = require('moment');

class Media extends React.Component {
    render() {
        return(
            <div>media</div>
        );
    }
}

class PostTitle extends React.Component {
    render () {
        return(
            <h3>{this.props.asking_price} || {this.props.manufacturer} || {this.props.length}</h3>
        );
    }
}

class PostDetails extends React.Component {
    render() {
        return(
            <h4>{this.props.posted_date} || {this.props.location}</h4>
        );
    }
}

class Condition extends React.Component {
    render() {
        return(
            <h5>{this.props.condition} || {this.props.boat_name}</h5>
        );
    }
}

class Description extends React.Component {
    render() {
        return(
            <h6>{this.props.description}</h6>
        );
    }
}

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    parseDate(date) {
        const dateObject = moment.unix((date.seconds));
        return dateObject.format("MMMM Do YYYY")
    }
    render() {        
        return(
            <li>
                <PostTitle />
                <Media />
                <PostDetails  
                   posted_date={this.parseDate(this.props.data.posted_date)} 
                   location="location"
                />
                <Condition condition={this.props.data.condition} boat_name={this.props.data.boat_name} />
                <Description description={this.props.data.description}/>
            </li>
        );
    }
}

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount() {
        db.collection("Posts").get()
            .then((querySnapshot) => { 
                let data = querySnapshot.docs.map(doc => ({ data: doc.data(), id: doc.id })) 
                this.setState({
                    data: data
                });
            })
    }
    render() {
        return(
            this.state.data.map((post) => {
            return (
                <Post data={post.data} key={post.id}/>
            )})
        );
    }
}

ReactDOM.render(
    <Posts />, 
    document.getElementById('root')
);


registerServiceWorker();