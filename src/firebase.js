import * as firebase from "firebase";
import { FIREBASE_CONFIG } from "./config";

firebase.initializeApp(FIREBASE_CONFIG);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref("articles");
const firebaseCategories = firebaseDB.ref("categories");

const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

export {
  firebase,
  firebaseCategories,
  firebaseDB,
  firebaseArticles,
  firebaseLooper
};
