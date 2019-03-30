import React from 'react';
import firebase from 'firebase';
// import {configKeyFirebase} from './Keys.js'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyDPt4atywY8WijB6AuujuGFlNH3mMPw18Q",
    authDomain: "pseudogram-f3c43.firebaseapp.com",
    databaseURL: "https://pseudogram-f3c43.firebaseio.com",
    projectId: "pseudogram-f3c43",
    storageBucket: "pseudogram-f3c43.appspot.com",
    messagingSenderId: "412609758018"
  });


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
