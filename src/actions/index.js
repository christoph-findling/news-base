import {
  firebaseArticles,
  firebaseLooper,
  firebaseDB,
  firebase
} from "../firebase";

export function getPosts(start) {
  let posts = [];
  let hasPosts = true;

  return dispatch => {
    firebaseArticles
      .orderByChild("negativedate")
      .startAt(start)
      .limitToFirst(3)
      .once("value")
      .then(snapshot => {
        posts = firebaseLooper(snapshot);
        if (posts.length > 0) {
          let helper = 0;
          posts.map(post => {
            firebase
              .storage()
              .ref("images")
              .child(post.image)
              .getDownloadURL()
              .then(url => {
                post["imageURL"] = url;
                helper++;
                if (helper >= posts.length) {
                  start = posts[posts.length - 1].negativedate + 1;
                  dispatch({
                    type: "GET_ALL_POSTS",
                    payload: posts,
                    startpoint: start,
                    hasPosts
                  });
                }
              });
          });
        } else {
          hasPosts = false;
          start = -999999999;
          dispatch({
            type: "GET_ALL_POSTS",
            payload: posts,
            startpoint: start,
            hasPosts
          });
        }
      });
  };
}

export function getArticle(id) {
  return dispatch => {
    firebaseDB
      .ref(`articles/${id}`)
      .once("value")
      .then(snapshot => {
        const article = snapshot.val();
        firebase
          .storage()
          .ref("images")
          .child(article.image)
          .getDownloadURL()
          .then(url => {
            article["imageURL"] = url;
            dispatch({
              type: "GET_ARTICLE",
              payload: article
            });
          });
      });
  };
}

export function removeArticle() {
  return {
    type: "REMOVE_ARTICLE",
    payload: null
  };
}

export function deleteArticle(id) {
  return dispatch => {
    firebaseDB
      .ref(`articles/${id}`)
      .remove()
      .then(() => {
        dispatch({
          type: "DELETE_ARTICLE",
          id: id
        });
      })
      .catch(function(error) {});
  };
}

export function postArticle(dataToSubmit) {
  return dispatch => {
    firebaseArticles
      .orderByChild("id")
      .limitToLast(1)
      .once("value")
      .then(snapshot => {
        let articleId = null;
        snapshot.forEach(childSnapshot => {
          articleId = childSnapshot.val().id;
        });
        //set date to firebase timestamp
        dataToSubmit["date"] = firebase.database.ServerValue.TIMESTAMP;
        dataToSubmit["negativedate"] = null;
        //set new article ID
        articleId <= 0
          ? (dataToSubmit["id"] = 0)
          : (dataToSubmit["id"] = articleId + 1);
        //push new article
        firebaseArticles.push(dataToSubmit).then(newArticle => {
          //get newly pushed article for setting negative date
          firebaseDB
            .ref(`articles/${newArticle.key}`)
            .once("value")
            .then(snapshot => {
              const article = snapshot.val();
              const timestamp = article["date"] * -1;
              firebaseDB
                .ref(`articles/${newArticle.key}`)
                .update({ negativedate: timestamp })
                .then(() => {
                  dispatch({
                    type: "POST_ARTICLE",
                    postedArticle: true,
                    newArticleKey: newArticle.key,
                    postError: ""
                  });

                  // this.props.history.push(`article/${newArticle.key}`);
                });
            })
            .catch(error => {
              dispatch({
                type: "POST_ARTICLE",
                postedArticle: false,
                postError: error
              });
            });
        });
      });
  };
}

export function registerUser(email, password) {
  return dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({
          type: "REGISTER_USER",
          loading: false,
          registerError: ""
        });
      })
      .catch(error => {
        dispatch({
          type: "REGISTER_USER",
          loading: false,
          registerError: error.message
        });
      });
  };
}
