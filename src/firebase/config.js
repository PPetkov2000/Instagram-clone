import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADZY6u_27AMgHv94EpFt_yuqF7g_EKUOA",
  authDomain: "teammanager-a529e.firebaseapp.com",
  databaseURL: "https://teammanager-a529e.firebaseio.com",
  projectId: "teammanager-a529e",
  storageBucket: "teammanager-a529e.appspot.com",
  messagingSenderId: "518332842812",
  appId: "1:518332842812:web:cfa7e42cc1dd95ab065439",
  measurementId: "G-LM2RFQLJ2E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, projectStorage, timestamp };
