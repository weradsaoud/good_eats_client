import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCuevmCyeU3Rf8dE6QEmAmjc27TdB1EIGo",
    authDomain: "good-eats-ea.firebaseapp.com",
    projectId: "good-eats-ea",
    storageBucket: "good-eats-ea.appspot.com",
    messagingSenderId: "846158339652",
    appId: "1:846158339652:web:32450f2ba099fd92ef6611",
    measurementId: "G-JTME27TKM6"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export { auth, firebase };
