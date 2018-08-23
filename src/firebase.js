  // Initialize Firebase
  import firebase from 'firebase';
  let config = {
    apiKey: "AIzaSyA56WfgzuCmL-Qtji_kytS50CCk9QJpmIE",
    authDomain: "sailboats-445f9.firebaseapp.com",
    databaseURL: "https://sailboats-445f9.firebaseio.com",
    projectId: "sailboats-445f9",
    storageBucket: "sailboats-445f9.appspot.com",
    messagingSenderId: "1001262121491"
  };
  firebase.initializeApp(config);
  export default firebase;