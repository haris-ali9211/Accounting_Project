import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDtqOgGWIqoq6k0rPQEMKEGM94infO2Igg",
    authDomain: "accounting-react-afb2c.firebaseapp.com",
    projectId: "accounting-react-afb2c",
    storageBucket: "accounting-react-afb2c.appspot.com",
    messagingSenderId: "381690283910",
    appId: "1:381690283910:web:3292c778bbf53a79930e07"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();