  import firebase from   'firebase/app';
  import "firebase/auth";
  import "firebase/database";
  import "firebase/storage";

  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDklQUWdTPPE-HWqsBhKnfULZDuCvRpezo",
    authDomain: "dispatcher-9e299.firebaseapp.com",
    databaseURL: "https://dispatcher-9e299.firebaseio.com",
    projectId: "dispatcher-9e299",
    storageBucket: "dispatcher-9e299.appspot.com",
    messagingSenderId: "298220705805",
    appId: "1:298220705805:web:2aadd8033448dfec689d44",
    measurementId: "G-1FBL9LX8S4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase;