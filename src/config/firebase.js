import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDy1NHxSsz2auiR6JwdVRQAOb5m82mkNrA",
    authDomain: "queue-management-a8696.firebaseapp.com",
    projectId: "queue-management-a8696",
    storageBucket: "queue-management-a8696.appspot.com",
    messagingSenderId: "881909944130",
    appId: "1:881909944130:web:7aea2aa9dd66def12442db",
    measurementId: "G-M22GWEZV19"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;