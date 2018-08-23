import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import firebase from './firebase.js';
import Post from './Post.js'
import AppBar from './AppBar.js';

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

const styles = theme => ({
  root: {
    flexGrow: 1,
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
                  data: data,
                  active: false
              });
          })
  }
  render() {
    return (
      <div className={this.props.root}>
      <AppBar />
          {this.state.data.map((post) => {
            return (
              <Grid 
                container
                justify="center"
                alignItems="center" 
                spacing={24}
                key={post.id}
              >
                <Grid item xs={12} sm={post.data.featured_post ? 9 : 7} md={post.data.featured_post ? 6 : 4}>
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