import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
firebase.auth().useDeviceLanguage();

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
