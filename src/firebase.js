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

  // Sign Up
  export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

  // Sign In
  export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

  // Sign out
  export const doSignOut = () =>
  auth.signOut();

  // Password Reset
  export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

  // Password Change
  export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);


  export const google = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
  export const email = firebase.auth.EmailAuthProvider.PROVIDER_ID;
  export const auth = firebase.auth();
  export default firebase;
