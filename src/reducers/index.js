export default function(state = {}, action) {
  switch (action.type) {
    case "GET_ALL_POSTS":
      return {
        ...state,
        posts: state.posts
          ? [...state.posts, ...action.payload]
          : action.payload,
        start: action.startpoint,
        hasPosts: action.hasPosts
      };
    case "GET_ARTICLE":
      return {
        ...state,
        article: action.payload
      };
    case "REMOVE_ARTICLE":
      return {
        ...state,
        article: null
      };
    case "REGISTER_USER":
      return {
        ...state,
        loading: action.loading,
        registerError: action.registerError
      };
    case "DELETE_ARTICLE":
      return {
        ...state,
        posts: state.posts.filter(({ id }) => id !== action.id)
      };
    case "POST_ARTICLE":
      return {
        ...state,
        postedArticle: action.postedArticle,
        postError: action.postError,
        newArticleKey: action.newArticleKey
      };
    default:
      return state;
  }
}
