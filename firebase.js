import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDy95F970djBJoBVDmI1W5pz2m5upoDijE",
  authDomain: "book-change-7a20c.firebaseapp.com",
  projectId: "book-change-7a20c",
  storageBucket: "book-change-7a20c.appspot.com",
  messagingSenderId: "280127890843",
  appId: "1:280127890843:web:022ccdad7024cc340e2d3e",
  measurementId: "G-STT9EJKSRD"
};

const firebaseApp = firebase.initializeApp(
    firebaseConfig
);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, auth };
export { storage, firebase as default };