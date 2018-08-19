import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App.js';
import firebase from './firebase.js';
import moment from 'moment'
import Geocode from "react-geocode";
import MediaSlider from './MediaSlider.js';
import './App.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

// // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAFXhI5s36SfJEqv6dNDoIHjhbaHLfqwLc");
// Enable or disable logs. Its optional.
Geocode.enableDebug();

class PostTitle extends React.Component {
    render () {
        return(
            <h3>{this.props.asking_price} || {this.props.manufacturer} || {this.props.length}</h3>
        );
    }
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }
    componentDidMount() {
        const lat = this.props.lat.toString()
        const long = this.props.long.toString()
        Geocode.fromLatLng(lat, long).then(
            response => {
                const address = response.results[2].formatted_address;
                this.setState({
                    data: address
                });
            },
            error => {
                //parse and return error
                console.error(error);
            }
          );
    }
    render() {
        return(
            <div>{this.state.data}</div>
        );
    }
}

class PostDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount() {
    }
    render() {
        return( 
            <h4>{this.props.posted_date} || <Map lat={this.props.lat} long={this.props.long}/></h4>
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
            <div className="post">
                <PostTitle 
                    asking_price={this.props.data.asking_price}
                    manufacturer={this.props.data.manufacturer}
                    length={this.props.data.length}
                />
                <MediaSlider document_id={this.props.document_id}/>
                <PostDetails  
                   posted_date={this.parseDate(this.props.data.posted_date)} 
                   lat={this.props.data.location.latitude}
                   long={this.props.data.location.longitude}
                />
                <Condition condition={this.props.data.condition} boat_name={this.props.data.boat_name} />
                <Description description={this.props.data.description}/>
            </div>
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
                <Post data={post.data} document_id={post.id} key={post.id}/>
            )})
        );
    }
}

ReactDOM.render(
    <Posts />, 
    document.getElementById('root')
);


registerServiceWorker();