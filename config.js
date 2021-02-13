import firebase from 'firebase/app';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyBGKKWXxG8Neuya79v8yiKlHpvmQNwehSM",
    authDomain: "booksanta-50c45.firebaseapp.com",
    projectId: "booksanta-50c45",
    storageBucket: "booksanta-50c45.appspot.com",
    messagingSenderId: "787418544040",
    appId: "1:787418544040:web:830d463d46859e9e3d8f9d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();