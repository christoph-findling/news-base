export default function(state = {}, action) {
  switch (action.type) {
    case "GET_ALL_POSTS":
      return {
        ...state,
        posts: state.posts
          ? [...state.posts, ...action.payload]
          : action.payload,
        start: action.startpoint,
        end: action.endpoint,
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
    default:
      return state;
  }
}
