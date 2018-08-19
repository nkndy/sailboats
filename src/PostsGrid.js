import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import firebase from './firebase.js';
import Post from './Post.js'

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class PostsGrid extends React.Component {
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
    return (
      <div className={this.props.root}>
          {this.state.data.map((post) => {
            return (
              <Grid 
                container
                justify="center"
                alignItems="center" 
                spacing={24}
                key={post.id}
              >
                <Grid item xs={12} sm={6}>
                    <Post data={post.data} document_id={post.id}/>
                </Grid>
              </Grid>
            )}
          )}
      </div>
    );
  }
}

PostsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsGrid);

// class Posts extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: [],
//         };
//     }
//     componentDidMount() {
//         db.collection("Posts").get()
//             .then((querySnapshot) => { 
//                 let data = querySnapshot.docs.map(doc => ({ data: doc.data(), id: doc.id })) 
//                 this.setState({
//                     data: data
//                 });
//             })
//     }
//     render() {
//         return(
//             <Grid 
//             container
//             direction="column"
//             justify="center"
//             alignItems="center"
//             >
//             {this.state.data.map((post) => {
//                 return (
//                     <Grid 
//                     item 
//                     xs={12} 
//                     sm={6} 
//                     >
//                         <Post data={post.data} document_id={post.id} key={post.id}/>
//                     </Grid>
//                 )})}
//             </Grid>
//         );
//     }
// }