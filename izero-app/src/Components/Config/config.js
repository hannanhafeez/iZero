import firebase from 'firebase';

firebase.initializeApp({
  // apiKey: 'AIzaSyA7InB6C48XTevE_ez_V2YIxOV0wATIMs8',
  // authDomain: 'izerotest-9598f.firebaseapp.com',
  // projectId: 'izerotest-9598f',
  // storageBucket: 'izerotest-9598f.appspot.com',
  // messagingSenderId: '833675674644',
  // appId: '1:833675674644:web:dac3b6703d2a507e2e9301',
  // measurementId: 'G-SYRHVGC4YY',
  apiKey: "AIzaSyCEkWAUEMd4SiYPbSQIwevOxtmHBW5wPAY",
  authDomain: "izero-d399a.firebaseapp.com",
  databaseURL: "https://izero-d399a-default-rtdb.firebaseio.com",
  projectId: "izero-d399a",
  storageBucket: "izero-d399a.appspot.com",
  messagingSenderId: "389399278169",
  appId: "1:389399278169:web:90819314c9a2789d5e7748",
  measurementId: "G-LEK61PJ4QS"
});

export const firebaseRef = firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();
