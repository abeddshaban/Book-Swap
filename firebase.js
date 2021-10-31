import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const firebaseApp = firebase.initializeApp(
    firebaseConfig
);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, auth };
export { storage, firebase as default };
