import firebase from '../../firebase';

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
let posts = db.collection('Posts');

export default class Listing {
  constructor(listingId) {
    posts.doc(listingId).get()
        .then((querySnapshot) => {
        this.data = querySnapshot.data();
    });
  }
  updateListingData() {
    console.log('this.data');
  }
}
