  import firebase from 'firebase'


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDzlk0KBe0dpkCYFPmTyEGp2C5bmQ6E15o",
    authDomain: "ecommerce-8d967.firebaseapp.com",
    projectId: "ecommerce-8d967",
    storageBucket: "ecommerce-8d967.appspot.com",
    messagingSenderId: "72714128207",
    appId: "1:72714128207:web:d8c534f6ecc9b4f399933a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // export the functions from this file
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // using Google login
