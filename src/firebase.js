import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyCU2odZIzHPs_0pQ1rYHxXXJUB6I1fpqmU",
  authDomain: "forms-test-512cb.firebaseapp.com",
  databaseURL: "https://forms-test-512cb.firebaseio.com",
  projectId: "forms-test-512cb",
  storageBucket: "forms-test-512cb.appspot.com",
  messagingSenderId: "332627957621"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref("articles");

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

export { firebase, firebaseDB, firebaseArticles, firebaseLooper };
