import * as firebase from 'firebase';

  var firebaseConfig = {
    apiKey: "AIzaSyAiPfFuyGM6wQaXKb30xeUGIRMbZg6l_VM",
    authDomain: "clickbus-50c68.firebaseapp.com",
    databaseURL: "https://clickbus-50c68-default-rtdb.firebaseio.com/",
    projectId: "clickbus-50c68",
    storageBucket: "clickbus-50c68.appspot.com",
    messagingSenderId: "452635260871",
    appId: "1:452635260871:web:99c3ec636f54b98b374be2",
    measurementId: "G-8FHKMYC0FY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
