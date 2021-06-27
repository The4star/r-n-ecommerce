import firebase from 'firebase/app';
import "firebase/firestore";
import firebaseCreds from "./firebaseCreds.json"

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseCreds);
}

const firestoreClient = firebase.firestore();

export default firestoreClient;