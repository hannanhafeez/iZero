// import firebase from 'firebase';

// //import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AsyncStorage} from 'react-native';

// class Fire {
//   constructor() {
//     this.init();
//     this.checkAuth();
//   }

//   init = () => {
//     if (!firebase.apps.length) {
//       firebase.initializeApp({
//         apiKey: 'AIzaSyA7InB6C48XTevE_ez_V2YIxOV0wATIMs8',
//         authDomain: 'izerotest-9598f.firebaseapp.com',
//         databaseURL: 'https://izerotest-9598f-default-rtdb.firebaseio.com',
//         projectId: 'izerotest-9598f',
//         storageBucket: 'izerotest-9598f.appspot.com',
//         messagingSenderId: '833675674644',
//         appId: '1:833675674644:web:dac3b6703d2a507e2e9301',
//         measurementId: 'G-SYRHVGC4YY',
//       });
//     }
//   };

//   checkAuth = () => {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (!user) {
//         firebase.auth().signInAnonymously();
//       }
//     });
//   };

//   send = (messages) => {
//     messages.forEach((item) => {
//       console.log('user1', item.user);
//       const message = {
//         text: item.text,
//         timestamp: firebase.database.ServerValue.TIMESTAMP,
//         user: item.user,
//       };
//       this.db.push(message);
//     });
//   };

//   parse = (message) => {
//     const {user, text, timestamp} = message.val();
//     const {key: _id} = message;
//     const createdAt = new Date(timestamp);
//     console.log('item', user, text, timestamp);
//     return {
//       _id,
//       createdAt,
//       text,
//       user,
//     };
//   };

//   get = (callback) => {
//     this.db.on('child_added', (snapshot) => callback(this.parse(snapshot)));
//   };

//   off() {
//     this.db.off();
//   }

//   get db() {
//     let chatroomID=123;
//     // AsyncStorage.getItem('chatroomID')
//     //   .then((value) => {
//     //     chatroomID = value;
//     //   })
//     //   .done();

//     if (chatroomID == undefined) {

//         AsyncStorage.getItem('chatroomID')
//         .then((value) => {
//           chatroomID = value;
//           return firebase.database().ref(`messages/${chatroomID}`);
//         })
//         .done();
//       }
//     return firebase.database().ref(`messages/${chatroomID}`);
//   }

//   get uid() {
//     return (firebase.auth().currentUser || {}).uid;
//   }
// }
// export default new Fire();

import React, {useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';

export default function Fire() {
  useEffect(() => {
    init = () => {
      if (!firebase.apps.length) {
        firebase.initializeApp({
          // apiKey: 'AIzaSyA7InB6C48XTevE_ez_V2YIxOV0wATIMs8',
          // authDomain: 'izerotest-9598f.firebaseapp.com',
          // databaseURL: 'https://izerotest-9598f-default-rtdb.firebaseio.com',
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
      }
    };
  }, []);

  send = (messages) => {
    messages.forEach((item) => {
      console.log('user1', item.user);
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      this.db.push(message);
    });
  };

  parse = (message) => {
    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);
    console.log('item', user, text, timestamp);
    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on('child_added', (snapshot) => callback(this.parse(snapshot)));
  };

  off = () => {
    this.db.off();
  };

  db = () => {
    let chatroomID = 123;

    if (chatroomID == undefined) {
      AsyncStorage.getItem('chatroomID')
        .then((value) => {
          chatroomID = value;
          return firebase.database().ref(`messages/${chatroomID}`);
        })
        .done();
    }
    return firebase.database().ref(`messages/${chatroomID}`);
  };

  uid = () => {
    return (firebase.auth().currentUser || {}).uid;
  };
}
