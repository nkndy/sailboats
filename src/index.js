import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import firebase from './firebase.js';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

var db = firebase.firestore();

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
    render() {
        return(
            <li>
                <h2>hi!</h2>
                {/* <Media />
                <PostTitle asking_price={this.props.data.asking_price} manufacturer={this.props.data.manufacturer} length={this.props.data.length}/>
                <PostDetails location={this.props.data.location} posted_date={this.props.data.posted_date}/>
                <Condition condition={this.props.data.condition} boat_name={this.props.data.boat_name}/>
                <Description description={this.props.data.description}/> */}
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
    renderPosts() {
        return this.state.data.map((post, index) => {
            return (
                <div>
                    {post.id}
                </div>
            )
        })
    }
    render() {
        return(
            <div>
                {this.renderPosts()}
            </div>
        );
    }
}

ReactDOM.render(
    <Posts />, 
    document.getElementById('root')
);


registerServiceWorker();