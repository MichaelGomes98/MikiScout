import firebase from 'firebase'

// Your web app's Firebase configuration
 var firebaseConfig = {
   apiKey: "AIzaSyBxnUQB5HkU-K2tVRisW6scFTw8QuskIn0",
   authDomain: "mikiscout-b8d1d.firebaseapp.com",
   databaseURL: "https://mikiscout-b8d1d.firebaseio.com",
   projectId: "mikiscout-b8d1d",
   storageBucket: "mikiscout-b8d1d.appspot.com",
   messagingSenderId: "149866210583",
   appId: "1:149866210583:web:481f2fa34709c056598352"
 };
 // Initialize Firebase
 const fire = firebase.initializeApp(firebaseConfig);

export default fire;
