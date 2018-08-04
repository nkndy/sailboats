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

// class Posts extends React.Component {
//     render() {
//         return(
//             null
//         );
//     }
// }

function Posts(props) {
    const posts = props.posts;
    const listPosts = posts.map((post) =>
        <Post 
            key={post.id}
            data={post.data}
        />
    );
    return (
      <ul>
        {listPosts}
      </ul>
    );
  }

class Post extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data: [],
    //     };
    // }
    // componentDidMount() {
    //     let newState = [];
    //     db.collection("Posts").get().then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             newState.push({
    //                 data: doc.data()
    //             });
    //         });
    //     });
    //     this.setState({
    //         data: newState
    //     });
    // }
    render() {
        return(
            <li>
                <Media />
                <PostTitle asking_price={this.props.data.asking_price} manufacturer={this.props.data.manufacturer} length={this.props.data.length}/>
                <PostDetails location={this.props.data.location} posted_date={this.props.data.posted_date}/>
                <Condition condition={this.props.data.condition} boat_name={this.props.data.boat_name}/>
                <Description description={this.props.data.description}/>
            </li>
        );
    }
}

const posts = [
    {id: 1, data: {asking_price: 7999, boat_name: 'Tigan', condition: 'Good', description: 'This is a description', length: 26, location: '[48.8172, 123.6151]', manufacturer: 'Merriholm', posted_date: 'August 3, 2018 at 2:00:00 PM UTC-7', renewal_date: 'September 3, 2018 at 2:00:00 PM UTC-7', sold: false, user: 'Users/oSAdnOKBql2C2KkPJqST'}},
    {id: 2, data: {asking_price: 9999, boat_name: 'Ecliptic', condition: 'Poor', description: 'This is a decriptionThis is a description', length: 29, location: '[48.8172, 123.6151]', manufacturer: 'Sun Star', posted_date: 'August 3, 2018 at 2:00:00 PM UTC-7', renewal_date: 'September 3, 2018 at 2:00:00 PM UTC-7', sold: false, user: 'Users/oSAdnOKBql2C2KkPJqST'}}
]

db.collection("Posts").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        posts.push({
            data: doc.data(),
            id: doc.id
        });
        console.log(doc.id);
    });
});

ReactDOM.render(
    <Posts posts={posts}/>, 
    document.getElementById('root')
);


registerServiceWorker();