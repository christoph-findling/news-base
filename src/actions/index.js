import {
  firebaseArticles,
  firebaseLooper,
  firebaseDB,
  firebase
} from "../firebase";

export function getPosts(start, end) {
  let posts = [];
  let startpoint = 0;
  let hasPosts = true;
  if (start) {
    startpoint = start;
  }

  // let posts = [];
  // let startpoint = 0;
  // let endpoint = 2;
  // let hasPosts = true;
  // if (start && end) {
  //   startpoint = start;
  //   endpoint = end;
  // }

  // return dispatch => {
  //   firebaseArticles
  //     .orderByChild("id")
  //     .startAt(startpoint)
  //     .endAt(endpoint)
  //     .once("value")
  //     .then(snapshot => {
  //       posts = firebaseLooper(snapshot);
  //       posts.length > 0 ? "" : (hasPosts = false);
  //       dispatch({
  //         type: "GET_ALL_POSTS",
  //         payload: posts,
  //         startpoint,
  //         endpoint,
  //         hasPosts
  //       });
  //     });
  // };

  return dispatch => {
    firebaseArticles
      .orderByChild("date")
      .startAt(startpoint)
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
                  start = posts[posts.length - 1].date + 1;
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
          start = 0;
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
        console.log(snapshot.val());
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
        console.log("removed item: " + id);
        dispatch({
          type: "DELETE_ARTICLE",
          id: id
        });
      })
      .catch(function(error) {
        console.log("error deleting article " + id + " : " + error);
      });
  };
}

export function registerUser(email, password) {
  console.log(email + password);
  return dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // this.props.history.push("/");
        console.log("registered user");
        dispatch({
          type: "REGISTER_USER",
          loading: false,
          registerError: ""
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "REGISTER_USER",
          loading: false,
          registerError: error.message
        });
      });
  };
}
