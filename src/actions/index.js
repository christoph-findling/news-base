import { firebaseArticles, firebaseLooper, firebaseDB } from "../firebase";

export function getPosts(start, end) {
  let posts = [];
  let startpoint = 0;
  let endpoint = 2;
  let hasPosts = true;
  if (start && end) {
    startpoint = start;
    endpoint = end;
  }

  return dispatch => {
    firebaseArticles
      .orderByChild("id")
      .startAt(startpoint)
      .endAt(endpoint)
      .once("value")
      .then(snapshot => {
        posts = firebaseLooper(snapshot);
        posts.length > 0 ? "" : (hasPosts = false);
        dispatch({
          type: "GET_ALL_POSTS",
          payload: posts,
          startpoint,
          endpoint,
          hasPosts
        });
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
        dispatch({
          type: "GET_ARTICLE",
          payload: article
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
