import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth"
import firebaseCreds from "./firebaseCreds.json"

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseCreds);
}

const authClient = firebase.auth();
const firestoreClient = firebase.firestore();

export {
  authClient,
  firestoreClient
} 